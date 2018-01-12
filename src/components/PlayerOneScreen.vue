<template>
  <div >
      <video height="400" ref="PlayerTwoRemoteVideox"></video>
      <!-- <video width="200" ref="PlayerOneLocalVideo" ></video> -->
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "PlayerOneScreen",
  props: ["roomId"],
  data() {
    return {
      roomName: "bisajadi" + this.roomId
    };
  },
  mounted() {
    this.getRoom();
  },
  methods: {
    getRoom() {
      // axios
      //   .get("https://x.fajarpatappari.tk:3000/rooms/" + this.roomId)
      //   .then(({ data }) => {
      //     console.log(data);
          
      //   })
      //   .catch(console.error)
      this.initWebRtc()
      this.doWaiting()
      this.listeners()  
    },
    initWebRtc () {
      this.webrtc = new SimpleWebRTC ({
        localVideoEl: this.$refs.PlayerOneLocalVideo,
        remoteVideosEl: '',
        autoRequestMedia: true
        // url: "turn:x.fajarpatappari.tk:8888"
      })
    },
    doWaiting: function() {

     
   
    },
    listeners: function() {
      this.webrtc.on("readyToCall", () => {
        console.log("webrtc ready to callwwowowowo");
           console.log("roomName:", this.roomName);
      // this.$refs.localVideo.classList.remove("remote");
      // this.$refs.localVideo.classList.add("local");
      console.log("Waiting for player two.......");
        this.webrtc.joinRoom(this.roomName);
      });
      this.webrtc.on("videoAdded", (video, peer) => {
        console.log("video added", peer);
        this.$refs.PlayerTwoRemoteVideox.srcObject = peer.stream;
        this.$refs.PlayerTwoRemoteVideox.play(()=>{
          this.connectionHandler(peer);
        })
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
            this.chooseRoom = false;
            // this.$refs.localVideo.classList.remove("local");
            // this.$refs.localVideo.classList.add("remote");
            break;
        }
      });
    }
  }
};
</script>

<style scoped>
video{
  background: yellow;
  
}
</style>
