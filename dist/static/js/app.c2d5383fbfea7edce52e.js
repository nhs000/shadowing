webpackJsonp([1],{K4pw:function(e,t){},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("7+uW"),a={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var r=i("VU/8")({name:"App"},a,!1,function(e){i("Rt27")},null,null).exports,s=i("/ocq"),o={name:"VideoPlayer",props:{videoId:String},data:function(){return{}},methods:{playAt:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.player.seekTo(e),this.player.playVideo()},playing:function(){},pause:function(){this.player.pauseVideo()},resume:function(){this.player.playVideo()}},computed:{player:function(){return this.$refs.youtube.player}}},u={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h3",[this._v("Player.")]),this._v(" "),t("youtube",{ref:"youtube",attrs:{"video-id":this.videoId,"start-seconds":100},on:{playing:this.playing}})],1)},staticRenderFns:[]};var l=i("VU/8")(o,u,!1,function(e){i("canf")},"data-v-ad62fb3c",null).exports,d={name:"VideoPlayer",props:{videoId:String,lagTime:Number},data:function(){return{}},created:function(){},methods:{playAt:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.player.seekTo(parseFloat(e)+parseFloat(this.lagTime)),this.player.mute(),this.player.playVideo()},playing:function(){console.log(this.currentTime)},pause:function(){this.player.pauseVideo()},resume:function(){this.player.playVideo()}},computed:{player:function(){return this.$refs.youtube.player}}},c={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("h3",[this._v("Transcript.")]),this._v(" "),t("youtube",{ref:"youtube",attrs:{"video-id":this.videoId},on:{playing:this.playing}})],1)},staticRenderFns:[]};var v={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e._v("Speech recognition here\n  "),i("button",{on:{click:e.startRecogize}},[e._v("Start")]),e._v(" "),i("button",{on:{click:e.endRecognize}},[e._v("End")]),e._v(" "),i("p",[e._v(e._s(e.result))])])},staticRenderFns:[]},p={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e._m(0),e._v(" "),i("p",[e._v("Note: I find the best lag time is about 3s.\n    ")]),e._v(" "),i("p",[e._v("Todo: Find the way to get the caption standalone.")]),e._v(" "),i("hr"),e._v(" "),i("div",[i("label",[e._v("Video ID: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.videoId,expression:"videoId"}],domProps:{value:e.videoId},on:{input:function(t){t.target.composing||(e.videoId=t.target.value)}}})]),e._v(" "),i("div",[i("label",[e._v("Start time: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.startTime,expression:"startTime"}],domProps:{value:e.startTime},on:{input:function(t){t.target.composing||(e.startTime=t.target.value)}}}),e._v(" "),i("label",[e._v("Lag time: ")]),i("input",{directives:[{name:"model",rawName:"v-model",value:e.lagTime,expression:"lagTime"}],domProps:{value:e.lagTime},on:{input:function(t){t.target.composing||(e.lagTime=t.target.value)}}})]),e._v(" "),i("button",{on:{click:function(t){return e.saveSetting()}}},[e._v("OK")])])},staticRenderFns:[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[e._v("\n        How to use:\n        "),i("ul",[i("li",[e._v("Enter youtube id")]),e._v(" "),i("li",[e._v("Change transcript video language to your native language")]),e._v(" "),i("li",[e._v("Change player video language to language you want to learn")]),e._v(" "),i("li",[e._v("Set the lag time")]),e._v(" "),i("li",[e._v("Unmute the player video")]),e._v(" "),i("li",[e._v("Play and shadowing")]),e._v(" "),i("li",[e._v('Press "p" to resume/pause')])])])}]};var m={name:"ShadowingIndex",data:function(){return{doneSettingFlg:!1,isPaused:!0,isPlayed:!1}},components:{VideoPlayer:l,Transcript:i("VU/8")(d,c,!1,function(e){i("WY7X")},"data-v-1d1709a0",null).exports,SpeechRecognition:i("VU/8")({name:"SpeechRecognition",data:function(){return{result:""}},methods:{startRecogize:function(){},endRecognize:function(){}},created:function(){}},v,!1,null,null,null).exports,Setting:i("VU/8")({name:"Setting",data:function(){return{videoId:"QEw0qEa0E50",startTime:0,lagTime:3}},methods:{saveSetting:function(){this.$emit("done-setting")}}},p,!1,function(e){i("ytgb")},"data-v-d16b13a8",null).exports},created:function(){var e=this;window.addEventListener("keyup",function(t){80==t.keyCode&&(0==e.isPlayed&&e.play(),e.togglePause())})},computed:{},methods:{play:function(){this.$refs.player.playAt(this.startTime),this.$refs.transcript.playAt(this.startTime),this.isPlayed=!0},togglePause:function(){this.isPaused?(this.$refs.player.resume(),this.$refs.transcript.resume(),this.isPaused=!1):(this.$refs.player.pause(),this.$refs.transcript.pause(),this.isPaused=!0)},setInitValues:function(){this.videoId=this.$refs.settingComp.videoId,this.startTime=this.$refs.settingComp.startTime,this.lagTime=this.$refs.settingComp.lagTime,this.doneSettingFlg=!0}}},f={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",[i("setting",{ref:"settingComp",on:{"done-setting":function(t){return e.setInitValues()}}})],1),e._v(" "),e.doneSettingFlg?i("div",[i("div",[i("button",{on:{click:e.play}},[e._v(e._s(e.isPlayed?"Restart":"Play"))]),e._v(" "),e.isPlayed?i("button",{on:{click:e.togglePause}},[e._v(e._s(e.isPaused?"Resume":"Pause"))]):e._e()]),e._v(" "),i("div",{attrs:{id:"video-player-wrapper"}},[i("video-player",{ref:"player",attrs:{"video-id":e.videoId}})],1),e._v(" "),i("div",{attrs:{id:"text-section"}},[i("div",{attrs:{id:"transcript-wrapper"}},[i("transcript",{ref:"transcript",attrs:{"lag-time":e.lagTime,"video-id":e.videoId}})],1)])]):e._e()])},staticRenderFns:[]};var g=i("VU/8")(m,f,!1,function(e){i("K4pw")},"data-v-1f0fafb5",null).exports;n.a.use(s.a);var h=new s.a({routes:[{path:"/",name:"HelloWorld",component:g}]}),_=i("H5Ot"),y=i.n(_);n.a.use(y.a),n.a.config.productionTip=!1,new n.a({el:"#app-test",router:h,components:{App:r},template:"<App/>"})},Rt27:function(e,t){},WY7X:function(e,t){},canf:function(e,t){},ytgb:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.c2d5383fbfea7edce52e.js.map