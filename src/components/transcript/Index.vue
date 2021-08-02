<template>
    <div>
        <h3>Transcript.</h3>
        <youtube :video-id="videoId" ref="youtube"
          @playing="playing"
        >
        </youtube>
    </div>
</template>

<script>
 export default {
   name: "VideoPlayer",
   props: {
     videoId: String,
     lagTime: Number
   },
   data() {
     return {
     }
   },
   created: () => {
   },
   methods: {
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
