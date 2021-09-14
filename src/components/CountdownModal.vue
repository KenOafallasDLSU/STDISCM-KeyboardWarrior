<template>
  <div>
    <a href="/#modal" @click.prevent="show" class="text-copy-primary hover:text-gray-600">Modal</a>
    <modal name="modal-post" :height="580" :width="700">
      <div class="countdown" id="countdown"> 0 </div>
    </modal>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'

  export default{
    Name: 'CountdownModal',
    methods: {
      show() {
        this.$modal.show('modal-post');
      },
      hide() {
        this.$modal.hide('modal-post');
      }
    }
  }
</script>

<style scoped>
.countdown{
  position: absolute;
  top: 2rem;
  font-size: 3rem;
  color: #F0DB4F;
  font-weight: bold;
}

</style>