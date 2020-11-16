<template>
  <div id="placeholder">
    <div id="modalWindow" class="modal">
      <div class="modal-content">
        <span class="close" v-on:click="toggleModal()">&times;</span>
        <ForumForm></ForumForm>
      </div>
    </div>
    <div id="chatId" class="chat" v-on:click="toggleModal()">
      <div class="background"></div>
      <svg class="chat-bubble" width="100" height="100" viewBox="0 0 100 100">
        <g class="bubble">
          <path class="line line1" d="M 30.7873,85.113394 30.7873,46.556405 C 30.7873,41.101961
          36.826342,35.342 40.898074,35.342 H 59.113981 C 63.73287,35.342
          69.29995,40.103201 69.29995,46.784744"/>
          <path class="line line2" d="M 13.461999,65.039335 H 58.028684 C
            63.483128,65.039335
            69.243089,59.000293 69.243089,54.928561 V 45.605853 C
            69.243089,40.986964 65.02087,35.419884 58.339327,35.419884"/>
        </g>
        <circle class="circle circle1" r="1.9" cy="50.7" cx="42.5"/>
        <circle class="circle circle2" cx="49.9" cy="50.7" r="1.9"/>
        <circle class="circle circle3" r="1.9" cy="50.7" cx="57.3"/>
      </svg>
    </div>
  </div>
</template>

<script>
import ForumForm from "@/components/pages/forum/ForumForm";

export default {
  name: "CreateForumPostModalBox.vue",
  components: {
    ForumForm
  },
  data() {
    return {
      modalIsOpen: false
    };
  },
  methods: {
    toggleModal: function () {
      this.modalIsOpen = !this.modalIsOpen;
    }
  },
  watch: {
    modalIsOpen: function () {
      if (this.modalIsOpen) {
        document.getElementById("modalWindow").style.display = "block";
      } else {
        document.getElementById("modalWindow").style.display = "none";
      }
      document.getElementById("chatId").classList.toggle("active");
      // alert(this.modalIsOpen);
    }
  }
};
</script>

<style scoped>
/* The Modal (background) */
#placeholder {
  height: 100%;
  width: 100%;
}

.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #dee5ed;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  border-radius: 10px;
  width: 50%;
  color: black;
  height: 65%;
}

/* The Close Button */
.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/*Add Post Button*/
body {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
}

.chat {
  position: fixed;
  z-index: 4;
  right: 80px;
  bottom: 50px;
}

.background {
  background-color: #6d8cb2;
  border-radius: 50%;
  box-shadow: 0 2.1px 1.3px rgba(0, 0, 0, 0.044),
  0 5.9px 4.2px rgba(0, 0, 0, 0.054), 0 12.6px 9.5px rgba(0, 0, 0, 0.061),
  0 25px 20px rgba(0, 0, 0, 0.1);
  height: 80px;
  left: 10px;
  position: absolute;
  top: 10px;
  width: 80px;
}

.chat-bubble {
  cursor: pointer;
  position: relative;
}

.bubble {
  transform-origin: 50%;
  transition: transform 500ms cubic-bezier(0.17, 0.61, 0.54, 0.9);
}

.line {
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.75;
  stroke-linecap: round;
  transition: stroke-dashoffset 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.line1 {
  stroke-dasharray: 60 90;
  stroke-dashoffset: -20;
}

.line2 {
  stroke-dasharray: 67 87;
  stroke-dashoffset: -18;
}

.circle {
  fill: #ffffff;
  stroke: none;
  transform-origin: 50%;
  transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1);
}

.active .bubble {
  transform: translateX(24px) translateY(4px) rotate(45deg);
}

.active .line1 {
  stroke-dashoffset: 21;
}

.active .line2 {
  stroke-dashoffset: 30;
}

.active .circle {
  transform: scale(0);
}

</style>