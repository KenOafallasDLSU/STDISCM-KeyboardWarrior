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
import firebase from 'firebase'
import db from '@/firebase'
import { query, where } from "firebase/firestore";  

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  name: 'Home',
  data: function() {
    return {
      Name: '',
    }
  },
  methods: {
    register: function(e){
      
      e.preventDefault()
      
      // check if name is unique
      db.collection('Users')
        .where('Name', '==', this.Name)
        .get().then(snapshot => {

          // if unique, add user to db
          if (snapshot.size == 0) {
              
              const user = { Name: this.Name }
              db.collection('Users').add(user)
                .then(function(docRef) {

                  console.log('Added ' + docRef.id + ' to db.')

                  // push user to the waiting room
                  const reference = { User: docRef }
                  db.collection('Waiting Room').add(reference)
                    .then(() => {
                      console.log('Added ' + reference.id + ' to waiting room.')
                    })
                    .catch(() => {
                      console.error("Error adding reference: ", error);
                    })

                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                })

          } else {
            console.log('Name already exists.')
          }

        })
    }
  }
}
</script>

<style>

.btn-start{
  height: 3em;
  width: 6em;
}

.form-input-name {
  font-size: 1.5em;
  display: flex;
  align-items: center;
  margin: 0.5em;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 1em;
}

.home {
  height: 100vh;
  padding: 2em;
  color: rgb(50, 50, 50);
  background-color:whitesmoke;
  font-family: 'Courier New', monospace;
}

.titlecard{
  margin: 0;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10em;
  padding: 9em;
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
  border-right: 0.05em solid;
  font-size: 5em;
  font-weight: 600;
  margin-bottom: 1em;
  height: fit-content;
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