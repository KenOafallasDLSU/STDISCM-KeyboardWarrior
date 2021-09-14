<template>
  <div class="home">
    <div class="titlecard">
      
      <b-icon class="logo" icon="keyboard"></b-icon>
      
      <div class="wrapper">
          <div class="title">
            Keyboard <span class="red">Warrior.</span>
          </div>
      </div>

      <div><b-form class="name-input-form">

        <div v-if="errors.length" class="error red">
            <span v-for="error in errors" v-bind:key="error" class="error red">
              <b-icon icon="exclamation-triangle" variant="danger"></b-icon>
              Error: {{ error }} 
            </span>
        </div>
        <div v-else><br/></div>

        <b-form-input
          v-model="Name"
          id="input-name"
          class="form-input-name"
          placeholder="What is your name, Warrior?"
        ></b-form-input>
        
        <b-button 
          v-on:click="register" 
          pill variant="outline-secondary" 
          class="btn-start">
          <b-icon icon="play-fill"></b-icon>
        </b-button>

      </b-form></div>

    </div>
  </div>
</template>

<script>
import db from '@/firebase'
import firebase from 'firebase'
import router from './../router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  data: function() {
    return {
      errors: [],
      Name: ''
    }
  },
  methods: {
    ...mapActions({
      setUser: 'auth/setUser'
    }),
    register: function(e){
      
      this.errors = []
      
      if (this.Name == '') {
        console.log("Name cannot be empty.")
        this.errors.push("Name cannot be empty.")
        return
      }
      
      // check if name is unique
      db.collection('Users')
        .where('Name', '==', this.Name)
        .get().then(snapshot => {

          // if unique, add user to db
          if (snapshot.size == 0) {
              
              const user = { 
                Name: this.Name,
                Timestamp: firebase.firestore.FieldValue.serverTimestamp()
              }
              console.log(this.Name)
              db.collection('Users').add(user)
                .then(docRef => {

                  console.log('Added ' + docRef.id + ' to db.')

                  // save user to state
                  console.log(this.Name)
                  this.setUser({userID: docRef.id, username: this.Name})

                  //this.$router.push({ name: 'Matchmaking' })
                  const path = '/matching'
                  console.log('Start matching...')
                  router.push(path).catch(()=>{})

                })
                .catch(() => {
                    console.error("Error adding document");
                    this.errors.push('Failed registering user.')
                })

          } else {
            console.log('Name already exists.')
            this.errors.push('Name already taken.')
          }

        })
        
        e.preventDefault()
    }
  }
}
</script>

<style>
.error {
  font-size: 1em;
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
  background: linear-gradient(0deg, rgb(255, 99, 71), rgba(255, 99, 71, 0.25)), url("./../../public/keyboardbg.png");
  background-size: cover;
  background-color: tomato;
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