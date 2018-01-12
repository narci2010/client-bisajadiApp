<template>
  <div class="screen-wrap">
     <div>
        <!-- <button @click="testCall">Call</button> -->
     </div>
     <div>
        <video width="400" height="300" ref="PlayerOneRemoteVideo" id="player-one-remote"></video>
        <canvas   width="400" height="300" class="canvasx" ref="overlay"></canvas>
     </div>
      <!-- <video ref="PlayerTwoLocalVideo"></video> -->
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import firebase from 'firebase'

export default {
  name: "PlayerTwoScreen",
  props: ["roomId"],
  data() {
    return {
      roomName: "bisajadi" + this.roomId,
      room: null,
      overlayCC: null,
      ctrack: null,
      eyebrows: {}
    };
  },
  firebase () {
    return {
      anArray: firebase.database().ref('teams')
    }
  },  
  mounted() {
    // this.getRoom();
    this.testCall()
  },
  methods: {
    getRoom() {
      axios
        .get("https://x.fajarpatappari.tk:3000/rooms/" + this.roomId)
        .then(({ data }) => {
          this.room = data;
        })
        .catch(console.error);
    },
    initWebRtc() {
      this.webrtc = new SimpleWebRTC({
        // localVideoEl: this.$refs.PlayerTwoLocalVideo,
        remoteVideosEl: "",
        autoRequestMedia: true,
        // url: "https://x.fajarpatappari.tk:8888"
      });
    },
    initClmTracker() {
      var vid = this.$refs.PlayerOneRemoteVideo;
      this.overlayCC = this.$refs.overlay.getContext("2d");
      this.ctrack = new clm.tracker();
      this.ctrack.init(pModel);
      this.ctrack.start(vid)
      this.drawLoop()
    },
    drawLoop() {
      requestAnimFrame(this.drawLoop);
      var vid_width = this.$refs.PlayerOneRemoteVideo.width;
      var vid_height = this.$refs.PlayerOneRemoteVideo.height;
      // this.$refs.overlay.width  = vid_width
      // this.$refs.overlay.height  = vid_height
      let ctx = this.$refs.overlay.getContext("2d")
      ctx.clearRect(0, 0, vid_width, vid_height);

      //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
      if (this.ctrack.getCurrentPosition()) {
        let tengah = this.ctrack.getCurrentPosition()[33]
        let jidat = [tengah[0], tengah[1] -30]
        let question = this.anArray[0].word
        ctx.font = "30px Arial";
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.strokeText(question,jidat[0],jidat[1]);
        ctx.textAlign="center";
        ctx.fillStyle = 'white';
        ctx.fillText(question,jidat[0],jidat[1]);
        ctx.lineWidth = 2;
        let segitiga = [jidat[0], jidat[1] -30]
        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 5;
        ctx.moveTo(segitiga[0],segitiga[1]);
        ctx.lineTo(segitiga[0] + 20,segitiga[1] -30);
        ctx.lineTo(segitiga[0] - 20,segitiga[1] -30);
        ctx.fill();

        // console.log(pos)
        // this.ctrack.draw(this.$refs.overlay);
      }
    },
    testCall() {
      this.initWebRtc();
      this.listeners();
      console.log(this.webrtc);
      console.log("testCall Method Called");
      this.doCall();
    },
    initTracking() {
      console.log("init tracking started");
      let tracker = new tracking.ObjectTracker("face");
      tracker.setInitialScale(4);
      tracker.setStepSize(2);
      tracker.setEdgesDensity(0.1);
      tracking.track("#player-one-remote", tracker, { camera: true });
      tracker.on("track", function(event) {
        console.log("tracking e: ", event.data);
      });
    },
    doCall: function() {
      console.log("doCall Method called");
      console.log("roomName:", this.roomName);
    },
    listeners: function() {
      console.log("Waiting.......");
      this.webrtc.on("readyToCall", () => {
        console.log("webrtc ready to callwwowowowo");
        this.webrtc.joinRoom(this.roomName);
      });
      this.webrtc.on("videoAdded", (video, peer) => {
        console.log("video added", peer);
        this.$refs.PlayerOneRemoteVideo.srcObject = peer.stream;
        this.$refs.PlayerOneRemoteVideo.play().then(() => {
          // this.initTracking();
          this.initClmTracker()
          this.connectionHandler(peer);
        });
      });
      this.webrtc.on("iceFailed", () => {
        console.log("local connection failure");
      });
      this.webrtc.on("connectivityError", () => {
        console.log("remote connection failure");
      });
    },
    connectionHandler: function(peer) {
      peer.pc.on("iceConnectionStateChange", event => {
        switch (peer.pc.iceConnectionState) {
          case "disconnected":
            console.log("disconnected");
          case "closed":
            console.log("disconnected");
            break;
        }
      });
    },
    answerQuestion() {}
  }
};
</script>

<style scoped>
.canvasx{
  /* background-color: #fd00ff3d; */
  /* height: 300px; */
}

video,canvas{
  /* width:400px;                           */
  /* height: 300px; */
  top: 40px;
  right: 20px;
  position:absolute;
}

video{
  border: solid 1px green;
  /* object-fit: fill; */
  background: rgb(188, 255, 188);
},
.screen-wrap{
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: stretch; */
  /* width: 100%; */
  /* height: 100%; */
  /* background: yellow; */
}

.screen-wrap > div {
  /* width : 100%; */
  
}
</style>
