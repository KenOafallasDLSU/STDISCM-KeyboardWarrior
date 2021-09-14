<template>
  <div class="home">
    <div class="titlecard">
      <b-spinner variant="dark" class="spinner" v-show="!isMatched"></b-spinner>
      
      <div class="wrapper">
          <div class="title" v-show="!isMatched">
            Finding <span class="red">Opponent</span>.<span class="red">.</span>.
          </div>
          <div class="title" v-show="isMatched">
            Match <span class="red">Found</span>!
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase'
import firebase from 'firebase'
import { 
  checkIfUserIsNull, 
  redirectToHome,
  deleteCurrentUser,
  deleteUserRoom
} from '@/resources/errorHandling.js'
import { mapActions } from 'vuex'

export default {
  name: 'Matchmaking',
  data() {
    return {
      isMatched: false,
      matchmakerUnsubscribe: null
    }
  },
  created() {
    window.addEventListener('beforeunload', this.handleExit)
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleExit)
  },
  methods: {
    ...mapActions({
      setRoomID: 'auth/setRoomID'
    }),

    /**
     * Handles behavior on evil exit
     * Deletes user and room
     */
    handleExit: function() {
      //console.log("Absolutely hope this works")

      deleteUserRoom()
      deleteCurrentUser()
      this.unsubscribe()
    },

    /**
     * main matchmaking function
     * matches current user with another user
     */
    matchmake: async function() {
      await this.sleepForFluff(3000)
      let currentRoomID = await this.findUnmatchedRoomID()
      
      if(currentRoomID === null){ //when no unmatched room exists
        console.log("Waiting for Match!")
        currentRoomID = await this.createRoom()
        this.setRoomID(currentRoomID)
        this.waitForMatch(currentRoomID)
      } else{ //when an unmatched room is found
        console.log("Match Found!")
        this.waitForMatch(currentRoomID)
        this.isMatched = true
        this.matchFound(this.$store.getters['auth/getCurrentUserID'], currentRoomID)
        await this.sleepForFluff(2000)
        this.goToGame()
      }
    },

    /**
     * Returns the oldest unmatched room ID
     */
    findUnmatchedRoomID: async function() {
      //check if there is a room waiting
      const query = db.collection('Rooms').where("matched", "==", false).orderBy("timeCreated", "asc").limit(1)
      const doc = await query.get()
      if(!doc.empty) {
        console.log("Room: " + doc.docs[0].id)
        return doc.docs[0].id
      } else return null
    },

    /**
     * creates a room with a random challenge string and the current logged in user as user1
     * returns that room's id
     */
    createRoom: async function() {
      //get a random challenge paragraph
      let paragraphID = await this.getRandomParagraphID()

      //add new room to collection
      const newRoom = await db.collection('Rooms').add({
        challengeString:  db.doc('Paragraphs/' + paragraphID),
        matched: false,
        progress1: 0,
        progress2: 0,
        user1:  db.doc('Users/' + this.$store.getters['auth/getCurrentUserID']),
        user2:  db.doc('Users/' + 'nil'),
        timeCreated: firebase.firestore.FieldValue.serverTimestamp()
      })

      return newRoom.id
    },

    /**
     * returns a random paragraph ID
     */
    getRandomParagraphID: async function() {
      const paragraphID = "7WAASLXDr19D01wLz2Fn"
      const query = db.collection('Paragraphs').doc(paragraphID)
      const doc = await query.get()

      if(doc.exists) {
        console.log(doc.data())
        return doc.id
      } else return null
    },

    /**
     * subscribes to the room for a user2 to enter
     * then adds that user to the current room
     * @param roomID - room to add user to
     */
    waitForMatch: async function(roomID) {
      console.log("waiting for match in: " + roomID)
      this.matchmakerUnsubscribe = db.collection('Rooms')
        .doc(roomID)
        .onSnapshot(async doc => {
          console.log(`Received doc snapshot: ${doc}`);
          if (doc.exists) {
            if(doc.data().matched) {
              console.log("Match Found with: " + doc.data().user2.id)
              this.isMatched = true
              await this.sleepForFluff(3000)
              this.goToGame()
            }
          }
        })
    },

    /**
     * Adds user to room as user2
     */
    matchFound: async function(userID, roomID) {
      const gameRoom = await db.collection('Rooms')
        .doc(roomID)
        .update({
          matched: true,
          user2:  db.doc('Users/' + userID)
        })
    },

    goToGame: function() {
      this.unsubscribe()

      //redirect to game
      //this.$router.push({ name: 'Home' })
    },

    /**
     * unsubscribes from the waiting room
     */
    unsubscribe: async function() {
      if(this.matchmakerUnsubscribe !== null)
        this.matchmakerUnsubscribe()
    },

    /**
     * Forces the app to wait so we can see the nice animations <3
     */
    sleepForFluff: function(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  async mounted () {
    const userIsNull = checkIfUserIsNull()
    if(userIsNull)
      redirectToHome()
    else
      this.matchmake()
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