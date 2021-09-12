<template>
    <div>
        <a href="/#modal" @click.prevent="show" class="text-copy-primary hover:text-gray-600">Modal</a>
        <!-- <modal name="modal-post" :clickToClose="false" :height="580" :width="700"> -->
        <modal name="modal-post" :height="580" :width="700">
            <div class="modal-logo">
                <img src="../assets/medal-win.png" class="modal-medal" v-if="winner">
                <img src="../assets/medal-lose.png" class="modal-medal" v-if="!winner">
            </div>
            <div class="modal-title tada">
                <div v-if="winner">Congratulations!</div>
                <div v-else>Whoops!</div>
            </div>
            <div class="modal-body">
                <div v-if="winner">Good Job! You won 1st place!</div>
                <div v-else>Better luck next time!</div>
            </div>
            <div>
                <button v-on:click="play" 
                    v-bind:style= "[winner ? {'background-color':'tomato'} : {'background-color':'#63A6FD'}]">
                    play again
                </button>
                <button v-on:click="exit" 
                    v-bind:style= "[winner ? {'background-color':'tomato'} : {'background-color':'#63A6FD'}]">
                    exit
                </button>
            </div>
        </modal>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

.modal-medal {
    width: 645px;
    margin-top: 20px;
    margin-bottom: 16px;
}

.modal-title {
    font-family: 'Montserrat';
    font-size: 36px;
    font-weight: bold;
}

.modal-body {
    font-family: 'Montserrat';
    font-size: 20px;
    padding: 8px;
}

button {
    height: 40px;
    width: 150px;
    margin: 30px 20px 0px 20px;

    border: 0px;
    border-radius: 6px;

    font-family: 'Montserrat';
    font-weight: bold;
    color: white;
    background-color: tomato;
}

.tada {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: tada;
}
.tada:hover {
  animation-iteration-count: infinite;
}
@keyframes tada {
  0% {
    transform: scale3d(1, 1, 1);
  }
  10%, 20% {
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }
  30%, 50%, 70%, 90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%, 60%, 80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>

<script>
import db from '@/firebase'
import { doc, deleteDoc } from "firebase/firestore";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
    methods: {
        show() {
            this.$modal.show('modal-post');
        },
        hide() {
            this.$modal.hide('modal-post');
        },
        play: function() {
            // put user back in waiting queue
            db.collection('Users')
                .doc(this.id)
                .get().then(() => {
                    var user = { id: this.id }
                    db.collection('Waiting Room').add(user)
                        .then(function(docRef) {
                            console.log(user.id)
                            console.log(docRef.id)
                            console.log("Document successfully added!");
                        })
                        .catch(() => {
                            console.error("Error adding document: ", error);
                        })
                })
            
            // redirect to waiting screen
            const path = "/matching"
            if (this.$route.path !== path) this.$router.push(path)
        },
        exit: function() {
            // delete user from db
            db.collection('Users').doc(this.id).delete().then(() => {
                console.log("Document successfully deleted!");

                // redirect to homepage
                const path = "/"
                if (this.$route.path !== path) this.$router.push(path)

                this.hide()
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    },
    data: function() {
        return {
            id: 'ZjOwRcGT4MUPRX58SRL4', // for testingg
            winner: true
        }
    }
}
</script>
