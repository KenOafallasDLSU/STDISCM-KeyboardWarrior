<template>
    <div>
        <a href="/#modal" @click.prevent="show" class="text-copy-primary hover:text-gray-600">Modal</a>
        <modal name="modal-post" :clickToClose="false" :height="580" :width="700">
            <div class="modal-logo">
                <img src="../assets/medal-win.png" class="modal-medal" v-if="winner">
                <img src="../assets/medal-lose.png" class="modal-medal" v-if="!winner">
            </div>
            <div class="modal-title">
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
