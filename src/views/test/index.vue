<template>
  <div class="dashboard-container">
      <el-time-picker
      class="showHour"
    v-model="value1"
    value-format="HH"
    format="HH"
    :picker-options="{
        start: '00:00',
        step: '01:00',
        end: '23:00'
    }"
    placeholder="任意时间点">
  </el-time-picker>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  components: {  },
  data() {
    return {
        value1:"",
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
