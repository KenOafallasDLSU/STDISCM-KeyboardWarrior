<template>
  <div>
     <b-modal size="sm" title="Get ready..." class="text-danger text-center" ref="countdown-modal" v-b-modal.modal-center hide-footer hide-header-close no-close-on-backdrop no-close-on-esc>
       <template #modal-header>
         <div class="mx-auto">
          <h5>Get ready...</h5>
         </div>
        </template>

         <div class="col-12 text-center countdown"> 
           {{this.number}} 
         </div>
    </b-modal>
  </div>
</template>

<script>
  export default{
    Name: 'CountdownModal',
    data() {
      return {
        number: 5
      }
    },
    methods: {
      showModal() {
        if(typeof this.$refs['countdown-modal'] !== 'undefined')
          this.$refs['countdown-modal'].show()
      },
      hideModal() {
        if(typeof this.$refs['countdown-modal'] !== 'undefined')
          this.$refs['countdown-modal'].hide()
      },
      sleepForFluff: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
    },
    async mounted() {
      this.showModal();
      
      let temp = 5
      for (var i = 0; i < temp; i++){
        await this.sleepForFluff(1000)
        this.number --;
      }

      if (this.number === 0) {
        this.number = 'START!'
        this.hideModal()
      }
    },
  }
</script>

<style scoped>
.countdown{
  top: 2rem;
  font-size: 3rem;
  color: tomato;
  font-weight: bold;
}

</style>