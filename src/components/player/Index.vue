<template>
    <div>
        <h3>Player.</h3>
        <youtube 
            :video-id="videoId" 
            ref="youtube" 
            @playing="playing"
            @ready="onReady"
            @subtitle-status="handleSubtitleStatus"
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
     
   onReady() {
     // Check subtitle availability after a short delay
     setTimeout(() => {
       this.checkSubtitlesAvailability();
     }, 2000);
   },

   checkSubtitlesAvailability() {
     const player = this.$refs.youtube.player;
     
     if (player && player.getOption) {
       try {
         const tracks = player.getOption('captions', 'tracklist') || [];
         const languageCode = this.playerVars.cc_lang_pref;
         const hasRequestedLanguage = tracks.some(track => 
           track.languageCode === languageCode || track.languageCode.startsWith(languageCode + '-')
         );
         
         this.$emit('subtitle-status', {
           hasRequestedLanguage,
           requestedLanguage: languageCode,
           availableTracks: tracks
         });
         
         return hasRequestedLanguage;
       } catch (error) {
         console.error("Error checking subtitle availability:", error);
         return false;
       }
     }
     return false;
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
