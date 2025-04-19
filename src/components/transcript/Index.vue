<template>
    <div>
        <h3>Transcript.</h3>
        <youtube 
            :video-id="videoId" 
            ref="youtube"
            @playing="playing"
            @ready="onReady"
            :player-vars="playerVars">
        </youtube>
    </div>
</template>

<script>
 export default {
   name: "VideoPlayer",
   props: {
     videoId: String,
     startTime: Number,
     lagTime: Number
   },
   data() {
     return {
       didInitSeek: false,
       playerVars: {
         start: (this.startTime + this.lagTime) || 0,
         cc_load_policy: 1, // Force subtitles on
         cc_lang_pref: 'vi', // Vietnamese subtitles
         hl: 'vi' // Vietnamese player interface
       }
     }
   },
   mounted() {
     // Update player variables if props change
     this.playerVars.start = (parseFloat(this.startTime) + parseFloat(this.lagTime)) || 0;
   },
   methods: {
     onReady() {
       // Ensure the video is muted from the beginning
       this.player.mute();
     },
     playAt(startTime = 0) {
       this.player.seekTo(parseFloat(startTime) + parseFloat(this.lagTime));
       this.player.mute();
       this.player.playVideo()
     },
     playing() {
       console.log(this.currentTime);
     },
     pause() {
       this.player.pauseVideo();
     },
     resume() {
       if (this.didInitSeek == false) {
         this.player.seekTo(parseFloat(this.startTime) + parseFloat(this.lagTime));
         this.didInitSeek = true;
       }
       this.player.playVideo();
     }
   },
   computed: {
     player() {
       return this.$refs.youtube.player;
     }
   },
 };
</script>

<style scoped>
</style>
