<template>
  <div class="home">
    <!-- <CountdownModal v-if="!start" /> -->
    <div class="container">
      <div class="paragraph" id="paragraph"></div>
      <textarea class="userinput" id="userinput" autofocus></textarea>
    </div>
  </div>
</template>

<script>
  import db from '@/firebase'
  import CountdownModal from '../components/CountdownModal.vue'
  
  export default{
    Name: 'Gameplay',
    components: {
      CountdownModal
    },
    data() {
      return {
        challenge: String,
        start: false,
        isPlayer1: true,
      }
    },
    mounted() {
      userinput.addEventListener('input', () => {
        const paragraphElement = document.getElementById('paragraph')
        const inputElement = document.getElementById('userinput')

        const arrayParagraph = paragraphElement.querySelectorAll('span')
        const arrayInput = inputElement.value.split('')

        let correct = true
        var numCorrect = 0
        arrayParagraph.forEach((characterSpan, index) => {
          const character = arrayInput[index]
          if (character == null) {
            characterSpan.style.color = "black"
            correct = false
          }
          else if (character === characterSpan.innerText) {
            characterSpan.style.color = "green"
            numCorrect += 1;
          }
          else {
            characterSpan.style.color = "red"
            correct = false
          }
        })

        if (this.isPlayer1){
          const gameRoom = db.collection('Rooms')
          .doc('BnWrLjSRhp1G0hdxj4VO')
          .update({
          progress1: numCorrect
          })
          console.log
        }
        else {
          const gameRoom = db.collection('Rooms')
          .doc('BnWrLjSRhp1G0hdxj4VO')
          .update({
          progress2: numCorrect
          })
        }

      })
    },
    async created() {
      const roomID = this.$store.getters['auth/getCurrentRoomID']
      //const queryroom = db.collection('Rooms').doc(roomID)
      const queryroom = db.collection('Rooms').doc('BnWrLjSRhp1G0hdxj4VO')
      const room = await queryroom.get()
      const paragraphID = room.data().challengeString.id
      
      const query = db.collection('Paragraphs').doc(paragraphID)
      const doc = await query.get()
      this.challenge = doc.data().Bank
      
      //if (room.user1.id === this.$store.getters['auth/getCurrentUserID'])
      if (room.data().user1.id === 'wgQYZatmt8KL23znp4DD')
        this.isPlayer1 = true
      else 
        this.isPlayer1 = false

      const paragraphElement = document.getElementById('paragraph')
      const inputElement = document.getElementById('userinput')
      const copy = this.challenge
      // paragraphElement.innerHTML = ''
      copy.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        paragraphElement.appendChild(characterSpan)
      })

      inputElement.value = null
    },
    
  }
</script>

<style scoped>
  *{
    box-sizing: border-box;
  }

  .home{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(0deg, rgb(255, 99, 71), rgba(255, 99, 71, 0.25)), url("./../../public/keyboardbg.png");
    background-size: cover;
    background-color: tomato;
    font-family: 'Montserrat';
    font-weight: bold;
  }

  body, .input{
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }

  .container{
    background-color: white;
    padding: 1rem;
    border-radius: .5rem;
    width: 700px;
    max-width: 90%;
  }

  .paragraph{
    margin-bottom: 1rem;
    margin-left: calc(1rem + 2px);
    margin-right: calc(1rem + 2px);
  }

  .userinput{
    background-color: transparent;
    border: 2px solid black;
    outline: none;
    width: 100%;
    height: 8rem;
    margin: auto;
    resize: none;
    padding: .5rem 1rem;
    font-size: 1rem;
    border-radius: .5rem;
  }

  .userinput:focus{
    border-color: black;
  }
</style>
