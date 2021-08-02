<template>
  <div>Speech recognition here
    <button @click="startRecogize">Start</button>
    <button @click="endRecognize">End</button>
    <p>{{result}}</p>
  </div>
</template>

<script>
export default {
  name: 'SpeechRecognition',
  data() {
    return {

      result: ''
    }
  },
  methods: {
    startRecogize() {

      // this.recognition.onresult = function(event) {
      //   console.log(event);
      //   this.result = event.results[0][0].transcript;
      // }
    },
    endRecognize() {

    }
  },
  created() {

  }
}
</script>
