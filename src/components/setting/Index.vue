<template>
    <div>
        <div>
            How to use:
            <ul>
                <li>Enter youtube id</li>
                <li>Change transcript video language to your native language</li>
                <li>Change player video language to language you want to learn</li>
                <li>Set the lag time</li>
                <li>Unmute the player video</li>
                <li>Play and shadowing</li>
                <li>Press "p" to resume/pause</li>
            </ul>
        </div>
        <p>Note: I find the best lag time is about 3s.
        </p>
        <p>Todo: Find the way to get the caption standalone.</p>

        <hr/>
        <div><label>Video ID: </label><input v-model="videoId"></div>
        <div>
        <label>Start time: </label><input v-model="startTime">
        <label>Lag time: </label><input v-model="lagTime">
        </div>
        <button @click="saveSetting()">OK</button>
    </div>
</template>

<script>
 export default {
   name: "Setting",
   data: () => {
     return {
       videoId: 'QEw0qEa0E50',
       startTime: 0,
       lagTime: 3
     }
   },
   methods: {
     saveSetting() {
       this.$emit('done-setting');
     }
   }
 }
</script>

<style scoped>
    
</style>
