<template>
  <div class="container">
    <!-- progress for user1 -->
    <div class="row">
      <div class="col-lg-2">Guest (You)</div>
      <div class="col-lg-8">
        <div class="progress-bar">
          <div class="progress-bar-value">{{ this.percent1 }}</div>
          <div class="progress-bar-fill" :style="{ width: fill1 }"></div>
        </div>
      </div>
    </div>
    <br />
    <!-- progress for user2 -->
    <div class="row">
      <div class="col-lg-2">Guest</div>
      <div class="col-lg-8">
        <div class="progress-bar">
          <div class="progress-bar-value">{{ this.percent2 }}</div>
          <div class="progress-bar-fill" :style="{ width: fill2 }"></div>
        </div>
      </div>
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
    console.log(this.$route);
    console.log(this.$store.challenge);

    this.roomID = this.$route.params.roomID;
    this.progressListener();
  },
  name: 'ProgressBar',
  methods: {
    // get paragraph length from the db
    getParagraphLength: function() {
      db.collection('Paragraphs')
        .doc(this.paragraphID)
        .get()
        .then(snapshot => {
          this.paragraphLength = snapshot.data().Length;
          this.progressListener();
        });
    },

    // listener for progress 1 and 2
    progressListener: async function() {
      db.collection('Rooms')
        .doc(this.roomID)
        .onSnapshot(async doc => {
          this.setValue(doc.data().progress1, doc.data().progress2);

          console.log(doc.data().progress1, doc.data().progress2);
        });
    },
    
    // sets the value of the progress bar
    setValue: function(p1_newVal, p2_newVal) {
      this.bar1 = p1_newVal;
      this.bar2 = p2_newVal;
      this.updateValue();
    },

    // updates the value of the progress bar with 
    // respect to the total char count of the paragraph
    updateValue: function() {
      this.percent1 = computePercentage(this.bar1);
      this.percent2 = computePercentage(this.bar2);
      this.updateFill();
    },

    computePercentage: function(value) {
      return parseInt(((value / this.paragraphLength) * 100)) + '%';
    },

    // updates the fill of the progress bar
    updateFill: function() {
      this.fill1 = this.percent1;
      this.fill2 = this.percent2;
    },

    // determine winner
    determineWinner: function() {
      if (this.bar1 > this.bar2 && this.bar1 == this.paragraphLength) {
        // user1 is the winner
      }
      else {
        // user2 is the winner
      }
    },

    data() {
      return {
        bar1: 0,
        bar2: 0,
        fill1: '',
        fill2: '',
        percent1: '',
        percent2: '',
        roomID: '', 
        paragraphLength: 0, // default value is 0
        paragraphID: '7WAASLXDr19D01wLz2Fn', //testing
      }
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
  border-radius: 25px;
  background-color: #fff;
  color: #282828;
}

.progress-bar-fill {
  height: 100%;
  width: 0;
  background-color: tomato;
  border-radius: 25px;
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