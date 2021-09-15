<template>
  <div class="container">
    <!-- progress for user1 -->
    <div class="row">
      <div class="col-lg-2">{{this.user1}}</div>
      <div class="col-lg-8">
        <div class="progress-bar">
          <div class="progress-bar-value">{{this.percent1}}</div>
          <div class="progress-bar-fill" :style="{width: fill1}"></div>
        </div>
      </div>
    </div>
    <br />
    <!-- progress for user2 -->
    <div class="row">
      <div class="col-lg-2">{{this.user2}}</div>
      <div class="col-lg-8">
        <div class="progress-bar">
          <div class="progress-bar-value">{{this.percent2}}</div>
          <div class="progress-bar-fill" :style="{width: fill2}"></div>
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
  created() {
    window.addEventListener('beforeunload', this.unsubscribe);
  },
  mounted() { 
    this.roomID = this.$route.params.roomID;
    this.user1_id = this.$store.getters['auth/getCurrentUserID'];
    this.progressListener();
    this.getUser1();
  },
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.unsubscribe);
  },
  data() {
    return {
      user1_id: '',
      user2_id: '',
      user1: '',
      user2: '',
      bar1: 0,
      bar2: 0,
      fill1: '',
      fill2: '',
      percent1: '',
      percent2: '',
      roomID: '', 
      paragraphLength: 0,
      paragraphID: '',
      unsubscriber: null
    }
  },
  name: 'ProgressBar',
  methods: {
    progressListener: async function() {
      this.unsubscriber = db.collection('Rooms')
        .doc(this.roomID)
        .onSnapshot(async doc => {

          if (doc.data().user2.id == this.user1_id) { // if current == user2
            this.user2_id = doc.data().user1.id;
            this.bar2 = doc.data().progress1;
            this.bar1 = doc.data().progress2;
          } else { // if current == user1
            this.user2_id = doc.data().user2.id
            this.bar2 = doc.data().progress2;
            this.bar1 = doc.data().progress1;
          }
          this.checkIfWinner();

          this.paragraphID = doc.data().challengeString.id
          this.getParagraphLength();
        });
    },

    getUser1: function() {
      db.collection('Users')
        .doc(this.user1_id)
        .get()
        .then(snapshot => {
          this.user1 = snapshot.data().Name;
          this.getUser2();
        });
    },

    getUser2: function() {
      db.collection('Users')
        .doc(this.user2_id)
        .get()
        .then(snapshot => {
          this.user2 = snapshot.data().Name;
        })
    },

    getParagraphLength: function() {
      db.collection('Paragraphs') 
        .doc(this.paragraphID)
        .get()
        .then(snapshot => {
          this.paragraphLength = snapshot.data().Length;
          this.updateValue();
        });
    },

    updateValue: function() {
      this.percent1 = this.computePercentage(this.bar1);
      this.percent2 = this.computePercentage(this.bar2);
      this.updateFill();
    },

    computePercentage: function(value) {
      return parseInt(((value / this.paragraphLength) * 100)) + '%';
    },

    updateFill: function() {
      this.fill1 = this.percent1;
      this.fill2 = this.percent2;
    },

    checkIfWinner: function() { // if there is a winner, unsubscribe
      console.log("bar1: " + this.bar1 + " bar2: " + this.bar2 + " total: " + this.paragraphLength);
      if (this.bar1 > this.bar2 && this.bar1 == this.paragraphLength) {
        this.unsubscribe();
      } else if (this.bar2 > this.bar1 && this.bar2 == this.paragraphLength) {
        this.unsubscribe();
      }
    },

    unsubscribe: async function() {
      if(this.unsubscriber !== null)
        this.unsubscriber();
    },
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