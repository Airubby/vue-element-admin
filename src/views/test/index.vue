<template>
  <div class="dashboard-container">
      <div>
        <search-select v-model="currentRole"></search-select>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {  },
  data() {
    return {
      currentRole: {
          id:'11',
          name:'颠鸾倒凤'
      }
    }
  },
  created() {
    console.log(WebSocket)
  },
  watch:{
      currentRole:function(val){
          console.log(val)
      }
  }
}
</script>
