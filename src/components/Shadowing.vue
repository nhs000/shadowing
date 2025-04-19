<template>
<div class="shadowing-container">
  <div>
    <setting ref="settingComp" v-on:done-setting="setInitValues()" />
  </div>
  
  <div v-if="doneSettingFlg" class="main-content">
    <div class="controls-bar">
      <div class="video-title">
        <h3>Language Shadowing Practice</h3>
        <div class="lag-indicator">
          <span>Transcript ahead by: <strong>{{ lagTime }}s</strong></span>
        </div>
      </div>
      
      <div class="playback-controls-container">
        <!-- Main centered play/stop controls -->
        <div class="main-controls">
          <!-- Backward 3s button -->
          <button @click="seekBackward" class="control-btn medium" title="Back 3 seconds">
            <i class="fas fa-backward"></i>
          </button>
          
          <!-- Main play/stop button -->
          <button @click="togglePlayback" class="control-btn large" :class="isPlaying ? 'danger' : 'primary'" :title="isPlaying ? 'Stop' : 'Play'">
            <i class="fas" :class="isPlaying ? 'fa-stop-circle' : 'fa-play-circle'"></i>
          </button>
          
          <!-- Forward 3s button -->
          <button @click="seekForward" class="control-btn medium" title="Forward 3 seconds">
            <i class="fas fa-forward"></i>
          </button>
        </div>
        
        <!-- Secondary controls below -->
        <div class="secondary-controls">
          <button @click="reset" class="control-btn" title="Restart">
            <i class="fas fa-sync"></i> Restart
          </button>
          <button @click="togglePausePlayer" class="control-btn" :class="{ active: !isPausedPlayer }" title="Toggle Player">
            <i :class="isPausedPlayer ? 'fas fa-play' : 'fas fa-pause'"></i> 
            {{ isPausedPlayer ? "Play" : "Pause" }} Player
          </button>
          <button @click="togglePauseTranscript" class="control-btn" :class="{ active: !isPausedTranscript }" title="Toggle Transcript">
            <i :class="isPausedTranscript ? 'fas fa-play' : 'fas fa-pause'"></i> 
            {{ isPausedTranscript ? "Play" : "Pause" }} Transcript
          </button>
        </div>
      </div>
    </div>
    
    <div class="video-container">
      <div class="video-panel player-panel">
        <h4>Player Video <span class="language-tag">(Target Language)</span></h4>
        <div class="video-wrapper">
          <video-player 
            ref="player" 
            :start-time="startTime" 
            :video-id="videoId"
            @subtitle-status="handlePlayerSubtitleStatus"
            />
          <div v-if="playerSubtitleWarning" class="subtitle-warning">
            <i class="fas fa-exclamation-triangle"></i>
            English subtitles not available for this video!
          </div>
        </div>
      </div>
      
      <div class="video-panel transcript-panel">
        <h4>Transcript Video <span class="language-tag">(Original Language)</span></h4>
        <div class="video-wrapper">
          <transcript 
            ref="transcript" 
            :start-time="startTime" 
            :lag-time="lagTime" 
            :video-id="videoId"
            @subtitle-status="handleTranscriptSubtitleStatus"
            />
          <div v-if="transcriptSubtitleWarning" class="subtitle-warning">
            <i class="fas fa-exclamation-triangle"></i>
            Vietnamese subtitles not available for this video!
          </div>
        </div>
      </div>
    </div>
    
    <div class="keyboard-shortcuts">
      <p><strong>Keyboard Shortcuts:</strong> Space = Play/Stop Both, P = Toggle Transcript Video, Q = Toggle Player Video, 
        Left Arrow = Back 3s, Right Arrow = Forward 3s</p>
    </div>
  </div>
</div>
</template>

<script>
import VideoPlayer from "./player/Index";
import Transcript from "./transcript/Index";
import SpeechRecognition from "./speech-recognition/Index";
import Setting from "./setting/Index.vue";

export default {
  name: "ShadowingIndex",
  data: () => {
    return {
      doneSettingFlg: false,
      isPausedPlayer: true,
      isPausedTranscript: true,
      playerSubtitleWarning: false,
      transcriptSubtitleWarning: false,
      availablePlayerTracks: [],
      availableTranscriptTracks: [],
      saveInterval: null,
      lastSavedPosition: 0
    }
  },
  components: {
    VideoPlayer,
    Transcript,
    SpeechRecognition,
    Setting
  },
  created: function() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode == 80) {
        /* if (this.isPlayed == false) this.play(); */
        this.togglePauseTranscript();
      }
      if (e.keyCode == 81) {
        /* if (this.isPlayed == false) this.play(); */
        this.togglePausePlayer();
      }
      if (e.keyCode == 32) { // Space key
        // Prevent default space bar behavior (page scrolling)
        e.preventDefault();
        this.togglePlayback();
      }
    });
    
    // Also prevent default space behavior on keydown to avoid page scrolling
    window.addEventListener('keydown', (e) => {
      if (e.keyCode == 32) {
        e.preventDefault();
      }
      
      // Left arrow for backward
      if (e.keyCode == 37) {
        e.preventDefault();
        this.seekBackward();
      }
      
      // Right arrow for forward
      if (e.keyCode == 39) {
        e.preventDefault();
        this.seekForward();
      }
    });
  },
  computed: {
    isPlaying() {
      return !this.isPausedPlayer || !this.isPausedTranscript;
    }
  },
  methods: {
    reset() {
      this.$refs.player.playAt(this.startTime);
      this.$refs.transcript.playAt(this.startTime + this.lagTime);
      this.isPausedPlayer = false;
      this.isPausedTranscript = false;
    },
    
    togglePlayback() {
      if (this.isPlaying) {
        // If currently playing, stop both videos
        this.$refs.player.pause();
        this.$refs.transcript.pause();
        this.isPausedPlayer = true;
        this.isPausedTranscript = true;
        
        // Save state when manually paused
        this.saveCurrentState();
      } else {
        // If currently stopped, play both videos
        this.$refs.player.resume();
        this.$refs.transcript.resume();
        this.isPausedPlayer = false;
        this.isPausedTranscript = false;
      }
    },
    
    togglePauseTranscript() {
      if (this.isPausedTranscript) {
        /* this.$refs.player.resume(); */
        this.$refs.transcript.resume();
        this.isPausedTranscript = false;
      } else {
        /* this.$refs.player.pause(); */
        this.$refs.transcript.pause();
        this.isPausedTranscript = true;
      }
    },
    togglePausePlayer() {
      if (this.isPausedPlayer) {
        this.$refs.player.resume();
        /* this.$refs.transcript.resume(); */
        this.isPausedPlayer = false;
      } else {
        this.$refs.player.pause();
        /* this.$refs.transcript.pause(); */
        this.isPausedPlayer = true;
      }
    },
    /* resume() {
     *   this.$refs.player.resume();
     *   this.$refs.transcript.resume();
     * }, */
    setInitValues() {
      this.videoId = this.$refs.settingComp.videoId;
      this.startTime = parseFloat(this.$refs.settingComp.startTime);
      this.lagTime = parseFloat(this.$refs.settingComp.lagTime);
      this.doneSettingFlg = true;
      
      // Start auto-save once videos are loaded
      this.$nextTick(() => {
        this.startAutoSave();
      });
    },
    
    handlePlayerSubtitleStatus(statusData) {
      this.playerSubtitleWarning = !statusData.hasRequestedLanguage;
      this.availablePlayerTracks = statusData.availableTracks;
    },
    
    handleTranscriptSubtitleStatus(statusData) {
      this.transcriptSubtitleWarning = !statusData.hasRequestedLanguage;
      this.availableTranscriptTracks = statusData.availableTracks;
    },
    
    async seekBackward() {
      const wasPlaying = !this.isPausedPlayer;
      
      // For player video
      const player = this.$refs.player.player;
      if (player) {
        const currentTime = await player.getCurrentTime();
        const newTime = Math.max(0, currentTime - 3);
        
        // Just seek without forcing play
        player.seekTo(newTime);
        if (wasPlaying) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      }
      
      // For transcript video
      const transcript = this.$refs.transcript.player;
      if (transcript) {
        const currentTime = await transcript.getCurrentTime();
        const newTime = Math.max(0, currentTime - 3);
        
        // Just seek without forcing play
        transcript.seekTo(newTime - parseFloat(this.lagTime) + parseFloat(this.lagTime));
        if (!this.isPausedTranscript) {
          transcript.playVideo();
        } else {
          transcript.pauseVideo();
        }
      }
    },
    
    async seekForward() {
      const wasPlaying = !this.isPausedPlayer;
      
      // For player video
      const player = this.$refs.player.player;
      if (player) {
        const currentTime = await player.getCurrentTime();
        const newTime = currentTime + 3;
        
        // Just seek without forcing play
        player.seekTo(newTime);
        if (wasPlaying) {
          player.playVideo();
        } else {
          player.pauseVideo();
        }
      }
      
      // For transcript video
      const transcript = this.$refs.transcript.player;
      if (transcript) {
        const currentTime = await transcript.getCurrentTime();
        const newTime = currentTime + 3;
        
        // Just seek without forcing play
        transcript.seekTo(newTime - parseFloat(this.lagTime) + parseFloat(this.lagTime));
        if (!this.isPausedTranscript) {
          transcript.playVideo();
        } else {
          transcript.pauseVideo();
        }
      }
    },
    
    saveCurrentState() {
      // Only save if videos are loaded
      if (this.$refs.player && this.$refs.player.player) {
        this.$refs.player.player.getCurrentTime().then(currentTime => {
          const stateData = {
            videoId: this.videoId,
            startTime: this.startTime,
            lagTime: this.lagTime,
            lastPosition: currentTime,
            savedAt: new Date().getTime()
          };
          
          localStorage.setItem('shadowingAppState', JSON.stringify(stateData));
          this.lastSavedPosition = currentTime;
          console.log('State saved, position:', currentTime);
        });
      }
    },
    
    startAutoSave() {
      // Save state every 5 seconds while playing
      this.saveInterval = setInterval(() => {
        if (!this.isPausedPlayer) {
          this.saveCurrentState();
        }
      }, 5000);
    },
    
    stopAutoSave() {
      if (this.saveInterval) {
        clearInterval(this.saveInterval);
      }
    }
  },
  beforeDestroy() {
    this.stopAutoSave();
    // Save state one last time when component is destroyed
    this.saveCurrentState();
  }
}

</script>

<style scoped>
.shadowing-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.main-content {
    background-color: #f5f5f5;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.controls-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;
}

.video-title h3 {
    margin: 0 0 5px 0;
    color: #333;
}

.lag-indicator {
    font-size: 14px;
    color: #666;
}

.playback-controls {
    display: flex;
    gap: 10px;
}

.control-btn {
    padding: 8px 15px;
    border: 1px solid #ccc;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: all 0.2s;
}

.control-btn:hover {
    background-color: #f0f0f0;
}

.control-btn.active {
    background-color: #e6f7ff;
    border-color: #91d5ff;
    color: #1890ff;
}

.control-btn.primary {
    background-color: #1890ff;
    color: white;
    border-color: #1890ff;
}

.control-btn.primary:hover {
    background-color: #40a9ff;
}

.video-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
}

.video-panel {
    background-color: white;
    border-radius: 6px;
    padding: 15px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
}

.video-panel h4 {
    margin-top: 0;
    margin-bottom: 10px;
    color: #333;
}

.language-tag {
    font-size: 14px;
    color: #666;
    font-weight: normal;
}

.video-wrapper {
    position: relative;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.keyboard-shortcuts {
    text-align: center;
    font-size: 14px;
    color: #666;
    margin-top: 20px;
}

.subtitle-warning {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    background-color: rgba(255, 77, 79, 0.8);
    color: white;
    padding: 5px 10px;
    text-align: center;
    font-size: 14px;
    z-index: 10;
    border-radius: 4px;
    margin: 0 10px;
}

.subtitle-warning i {
    margin-right: 5px;
}

/* For icons - You may need to add actual icons or a library */
[class^="icon-"] {
    display: inline-block;
    width: 16px;
    height: 16px;
}

.playback-controls-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
}

.main-controls {
    display: flex;
    justify-content: center;
    gap: 15px;
    width: 100%;
}

.secondary-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 100%;
}

.control-btn.large {
    font-size: 24px;
    padding: 12px 20px;
    min-width: 80px;
}

.control-btn.danger {
    background-color: #ff4d4f;
    color: white;
    border-color: #ff4d4f;
}

.control-btn.danger:hover {
    background-color: #ff7875;
}

.control-btn.medium {
    font-size: 18px;
    padding: 10px 16px;
    min-width: 60px;
}
</style>
