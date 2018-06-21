<template>
  <div class="gw-loading">
    <Spin fix>
        <Icon type="load-c" size=40 class="spin-icon-load"></Icon>
        <div class="txt" v-text="txt"></div>
    </Spin>
  </div>
</template>

<script>
export default {
  name: 'gwLoading',
  data () {
      return {
          
      }
  },
  props: {
    txt: {
      type: String,
      default: 'Loading...',
      required: false
    }
  }
}
</script>

<style lang="scss" src="@assets/styles/sass/public/gw-loading.scss"></style>

