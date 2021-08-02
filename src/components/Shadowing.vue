<template>
    <div>
        <div>
            <setting ref="settingComp" v-on:done-setting="setInitValues()" />
        </div>
        <div v-if="doneSettingFlg">
            <div>
                <!-- <button @click="reset">{{isPlayed ? "Restart" : "Play"}}</button> -->
                <!-- <button @click="togglePause" v-if="isPlayed">{{isPaused ? "Resume" : "Pause"}}</button> -->
                <!-- <button @click="resume">Resume</button> -->
            </div>
            <div id='video-player-wrapper'>
                <video-player ref="player" :start-time="startTime" :video-id="videoId" />
            </div>
            <div id='text-section'>
                <div id='transcript-wrapper'>
                    <transcript ref="transcript" :start-time="startTime" :lag-time="lagTime" :video-id="videoId"/>
                </div>
                <!-- <div id='tts-dialog-wrapper'>
                     <SpeechRecognition/>
                     </div> -->
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
   },
   methods: {
     /* play() {
      *   this.$refs.player.playAt(this.startTime);
      *   this.$refs.transcript.playAt(this.startTime);
      *   this.isPlayed = true;
      * }, */
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
 #video-player-wrapper {
     float: left;
     width: 40%;
 }

 #text-section {
     float: left;
     width: 60%;
 }

 #transcript-wrapper {
     /* width: 45%; */
     float: left;
 }

 #tts-dialog-wrapper {
     float: right;
 }
</style>
