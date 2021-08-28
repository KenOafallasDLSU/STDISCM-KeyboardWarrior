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
                <button v-bind:style= "[winner ? {'background-color':'tomato'} : {'background-color':'#63A6FD'}]">play again</button>
                <button v-bind:style= "[winner ? {'background-color':'tomato'} : {'background-color':'#63A6FD'}]">exit</button>
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
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;

  -webkit-animation-name: tada;
  animation-name: tada;
}
.tada:hover {
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
@-webkit-keyframes tada {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%, 20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }

  30%, 50%, 70%, 90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%, 60%, 80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}
@keyframes tada {
  0% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }

  10%, 20% {
    -webkit-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);
  }

  30%, 50%, 70%, 90% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }

  40%, 60%, 80% {
    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    -ms-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }

  100% {
    -webkit-transform: scale3d(1, 1, 1);
    -ms-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

</style>

<script>
export default {
    methods: {
        show() {
            this.$modal.show('modal-post');
        },
        hide() {
            this.$modal.hide('modal-post');
        }
    },
    data: () => {
        return {
            winner: true
        }
    }
}
</script>
