<template>
  <div class="home">
    <div class="titlecard">
      <b-spinner variant="dark" class="spinner"></b-spinner>
      
      <div class="wrapper">
          <div class="title">
            Finding <span class="red">Opponent</span>.<span class="red">.</span>.
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Matchmaking',
  data() {
    return {
      matchmakerUnsubscribe: null
    }
  },
  methods: {
    matchmake: async function() {
      var currentRoom = await this.findRoom()

      if(currentRoom === null){
        currentRoom = await this.createRoom()
        this.waitForMatch()
      }
    },

    findRoom: async function() {
      //check if there is a room waiting
    },

    createRoom: async function() {
      //make random room stuff

      //put user in a room
    },

    waitForMatch: function() {
      this.matchmakerUnsubscribe = timersCollection
        .doc(timerID)
        .onSnapshot(async doc => {
          if (doc.exists) {
            this.timeInput = doc.data().host_timeLeft
          }
        })
    },

    unsubscribe: function() {
      this.matchmakerUnsubscribe
    }
  }
}
</script>

<style scoped>
.spinner {
  height: 5rem;
  width: 5rem;
}

.btn-start{
  height: 3em;
  width: 6em;
}

.form-input-name {
  font-size: 1.5em;
  display: flex;
  align-items: center;
  width: 50%;
  margin: 0.5em;
  margin-top: 0.1em;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1em;
}

.form-input-name::placeholder {
  color: darkgray;
}

.home {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: rgb(50, 50, 50);
  background-color:tomato;
  font-family: 'Montserrat';
  font-weight: bold;
}

.titlecard{
  width: 90%;
  margin: 0;
  background: rgba(255, 255, 255, 1);
  border-radius: 10em;
  padding: 7em;
  box-shadow: -5px 10px 10px #00000062;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  display: flex;
  font-size: 15em;
  animation: float 6s ease-in-out infinite;
}

.red {
  color: tomato;
}

.title {
  width: 17ch;
  animation: 
    typing 2s steps(17), 
    blink .5s 
    step-end 
    infinite 
    alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.1em solid;
  font-size: 5em;
  font-weight: 700;
  margin-bottom: 1em;
  height: 1.3em;
}

@keyframes float {
  0% {transform: translatey(0);}
  50% {transform: translatey(-0.05em);}
  100% {transform: translatey(0);}
}

@keyframes typing {
  0% {width: 0}
}

@keyframes blink {
  50% {border-color: transparent}
}
</style>