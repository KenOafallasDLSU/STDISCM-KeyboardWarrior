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
  mounted() { 
    this.roomID = this.$route.params.roomID;
    this.user1_id = this.$store.getters['auth/getCurrentUserID'];
    console.log("user1 id: " + this.user1_id)
    this.progressListener();
    this.getUser1Name();
    this.getParagraphLength();
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
    // get paragraph length from the db
    getParagraphLength: function() {
      db.collection('Paragraphs')
        .doc(this.paragraphID)
        .get()
        .then(snapshot => {
          this.paragraphLength = snapshot.data().Length;
          this.updateValue();
        });
    },

    getUser1Name: function() {
      db.collection('Users')
        .doc(this.user1_id)
        .get()
        .then(snapshot => {
          this.user1 = snapshot.data().Name;
          console.log("user1: " + this.user1);

          this.getUser2Name();
        });
    },

    getUser2Name: function() {
      db.collection('Users')
        .doc(this.user2_id)
        .get()
        .then(snapshot => {
          this.user2 = snapshot.data().Name;
          console.log("user2: " + this.user2);
        });
    },

    // listener for progress 1 and 2
    progressListener: async function() {
      this.unsubscriber = db.collection('Rooms')
        .doc(this.roomID)
        .onSnapshot(async doc => {
          this.bar1 = doc.data().progress1;
          this.bar2 = doc.data().progress2;
          
          this.paragraphID = doc.data().challengeString.id
          console.log(this.paragraphID);

          this.user2_id = doc.data().user2.id;
          console.log("user2 id: " + this.user2_id); 

          // call this.unsubscribe when theres a winner
        });
    },

    // updates the value of the progress bar with 
    // respect to the total char count of the paragraph
    updateValue: function() {
      this.percent1 = this.computePercentage(this.bar1);
      this.percent2 = this.computePercentage(this.bar2);
      this.updateFill();
    },

    computePercentage: function(value) {
      return parseInt(((value / this.paragraphLength) * 100)) + '%';
    },

    // updates the fill of the progress bar
    updateFill: function() {
      this.fill1 = this.percent1;
      this.fill2 = this.percent2;

      console.log(this.fill1);
      console.log(this.fill2);
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