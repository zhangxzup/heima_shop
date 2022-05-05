<template>
  <view class="detail">
    <view class="title">{{newsText.title}}</view>
    <view class="subMsg">
      <text>发布时间：{{newsText.add_time.substr(0,10)}}</text>
      <text>浏览：{{newsText.click}}次</text>
    </view>
    <rich-text :nodes="newsText.content" class="passage"></rich-text>
    <!-- <view v-html="newsText.content" class="passage"></view> -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        newsText: []
      }
    },
    onLoad(options) {
      this.getNewsDetails(options.id);
    },
    methods: {
      async getNewsDetails(id) {
        await this.$myRequest({
          url: `/api/getnew/${id}`
        }).then((res) => {
          console.log(res);
          this.newsText = res.data.message[0];
        })
      }
    }
  }
</script>

<style lang="scss">
  .detail {
    box-sizing: border-box;
    width: 750rpx;
    padding: 20rpx 30rpx;

    .title {
      font-size: 48rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }

    .subMsg {
      font-size: 30rpx;
      color: #bdbdcd;
      margin-bottom: 20rpx;
      text-align: end;

      text:nth-child(2) {
        margin-left: 50rpx;
      }
    }

    .passage {
      line-height: 60rpx;
    }
  }
</style>
