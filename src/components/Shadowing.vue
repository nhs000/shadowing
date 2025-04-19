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
            <button @click="togglePlayback" class="control-btn large" :class="isPlaying ? 'danger' : 'primary'" :title="isPlaying ? 'Stop' : 'Play'">
              <i class="fas" :class="isPlaying ? 'fa-stop-circle' : 'fa-play-circle'"></i>
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
            <video-player ref="player" :start-time="startTime" :video-id="videoId" />
          </div>
        </div>
        
        <div class="video-panel transcript-panel">
          <h4>Transcript Video <span class="language-tag">(Original Language)</span></h4>
          <div class="video-wrapper">
            <transcript ref="transcript" :start-time="startTime" :lag-time="lagTime" :video-id="videoId"/>
          </div>
        </div>
      </div>
      
      <div class="keyboard-shortcuts">
        <p><strong>Keyboard Shortcuts:</strong> P = Toggle Transcript Video, Q = Toggle Player Video</p>
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
       /* isPlayed: false */
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
     }
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
</style>
