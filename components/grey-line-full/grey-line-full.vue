<template>
  <view>
    <view class="line" :style="{width:width,height:height,background:bg}"></view>
  </view>
</template>

<script>
  export default {
    name: "grey-line-full",
    props: {
      'width': {
        'type': String,
        'default': "750rpx"
      },
      'height': {
        'type': String,
        'default': "10rpx"
      },
      'bg': {
        'type': String,
        'default': "#eee"
      }
    },
    data() {
      return {};
    }
  }
</script>

<style lang="scss">
</style>
