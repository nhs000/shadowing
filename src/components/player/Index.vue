<template>
    <div>
        <h3>Player.</h3>
        <youtube 
            :video-id="videoId" 
            ref="youtube" 
            @playing="playing" 
            :player-vars="playerVars">
        </youtube>
    </div>
</template>

<script>
 export default {
   name: "VideoPlayer",
   props: {
     videoId: String,
     startTime: Number
   },
   data() {
     return {
       didInitSeek: false,
       playerVars: {
         start: this.startTime || 0,
         cc_load_policy: 1, // Force subtitles on
         cc_lang_pref: 'en', // English subtitles
         hl: 'en', // English player interface
         rel: 0, // Disable related videos
         modestbranding: 1 // Hide YouTube logo
       }
     }
   },
   mounted() {
     // Update player variables if props change
     this.playerVars.start = this.startTime || 0;
   },
   methods: {
     playAt(startTime = 0) {
       this.player.seekTo(startTime);
       this.player.playVideo();
     },
     playing() {
     },
     pause() {
       this.player.pauseVideo();
     },
     resume() {
       if (this.didInitSeek == false) {
         this.player.seekTo(parseFloat(this.startTime));
         this.didInitSeek = true;
       }
       this.player.playVideo();
     }
   },
   computed: {
     player() {
       return this.$refs.youtube.player
     }
   },
 };
</script>

<style scoped>
</style>
