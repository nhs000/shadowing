<template>
    <div>
        <h3>Player.</h3>
        <youtube :video-id="videoId" ref="youtube" @playing="playing" :start-seconds="100"></youtube>
    </div>
</template>

<script>
 export default {
   name: "VideoPlayer",
   props: {
     videoId: String
   },
   data() {
     return {
     }
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
