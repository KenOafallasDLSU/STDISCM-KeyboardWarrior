<template>
  <div class="container" >
    <div class="progress-bar">
      <div class="progress-bar-value">{{ this.percentage }}</div>
      <div class="progress-bar-fill" :style="{ width: fillValue }"></div>
    </div>
    <br />
    <!-- TESTING -->
    <div class="text-container">
      <p class="text">{{ this.paragraph }}</p>
    </div>
    <br />
    <div class="input-container">
      <textarea class="form-control" id="input-text" v-model="inputText" v-on:keyup="onInputUpdate()"></textarea>
    </div>
  </div>
</template>

<script>
import db from '@/firebase'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  created() { // on page load, connect to the db and find the necessary data
    this.getParagraphLength();
  },
  name: 'ProgressBar',
  // props: {
  //   paragraphID: String,
  //   inputText: String,
  //   userID: String, 
  //   paragraph: String
  // },
  methods: {

    getParagraphLength: function() {
      db.collection('Paragraphs')
        .doc(this.paragraphID)
        .get()
        .then(snapshot => {
          this.paragraphLength = snapshot.data().Length;
          this.paragraph = snapshot.data().Bank; // testing

          this.setValue(0); // default value is 0
        });
    },

    setValue: function(newValue) {
      this.barValue = newValue;

      this.updateValue();
    },

    updateValue: function() {
      this.percentage = parseInt(((this.barValue / this.paragraphLength) * 100)) + '%';

      this.updateFill(this.percentage);
    },

    updateFill: function(newFillValue) {
      this.fillValue = newFillValue;
    },

    onInputUpdate: function() {
      this.setValue(this.inputText.length);
    }

  },

  data: function() {
    return {
      barValue: 0,
      fillValue: '',
      percentage: '',
      inputText: '', // testing
      userID: 'sh7hNPQwu0OE6ZYA9L82', // testing
      paragraphID: 'CysWj5DVHmQOkXxY4IEA', //testing
      paragraph: '', // testing
      paragraphLength: 0 // default value is 0
    }
  }

}
</script>


<style scoped>
.progress-bar {
  position: relative;
  width: 100%;
  height: 40px;
  border: 1px solid rgb(41, 41, 41, 0.2);
  background-color: #fff;
  color: #282828;
}

.progress-bar-fill {
  height: 100%;
  width: 0;
  background-color: tomato;
  transition : width 1s ease;
}

.progress-bar-value {
  position: absolute;
  width: 100%;
  height: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>