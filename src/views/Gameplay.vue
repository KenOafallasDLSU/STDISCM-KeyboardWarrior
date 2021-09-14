<template>
  <div class="home">
    <!-- <CountdownModal v-if="!start" /> -->
    <div class="container">
      <div class="paragraph" id="paragraph">{{challenge}}</div>
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
        start: false
      }
    },
    mounted() {
      userinput.addEventListener('input', () => {
        const paragraphElement = document.getElementById('paragraph')
        const inputElement = document.getElementById('userinput')

        const arrayParagraph = paragraphElement.querySelectorAll('span')
        const arrayInput = inputElement.value.split('')

        let correct = true
        arrayParagraph.forEach((characterSpan, index) => {
          const character = arrayInput[index]
          if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
          }
          else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
          }
          else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
          }
        })
      })
    },
    async created() {
      // room = await queryRoom(roomID) //this is in URL or vuex, assume you can get from either
      // paragraphID = room.challengeString.id
      // paragraph = await queryParagraph(paragraphID)
      //challengeString = paragraph./*yung property nun na string*/
      
      const paragraphID = "7WAASLXDr19D01wLz2Fn"
      const query = db.collection('Paragraphs').doc(paragraphID)
      const doc = await query.get()
      this.challenge = doc.data().Bank

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
    color: rgb(50, 50, 50);
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
    background-color: #F0DB4F;
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
    border: 2px solid #A1992E;
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

  .correct{
    color:green;
  }

  .incorrect{
    color: red;
    text-decoration: underline;
  }
</style>
