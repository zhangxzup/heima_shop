<template>
  <view class="newsList">
    <view class="newsItem" v-for="(item,index) in newsList" :key="index" @click="getDetail(item.id)">
      <view class="img">
        <image :src="item.url"></image>
      </view>
      <view class="newsDetail">
        <view class="title">{{item.title}}</view>
        <view class="btm-msg">
          <text>发表时间：{{item.add_time.substr(0, 10)}}</text>
          <text>浏览：{{item.click}}次</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        newsList: []
      }
    },
    onLoad() {
      this.getNewsList();
    },
    methods: {
      async getNewsList() {
        await this.$myRequest({
          url: '/api/getnewslist'
        }).then((res) => {
          console.log(res);
          // this.newsList = res.data.message;
          //因为图片地址失效，所以临时添加一个本地图片地址，预览效果用
          this.newsList = res.data.message.map((item) => {
            item.url = '../../static/12.jpg'
            return item;
          });
        })
      },
      getDetail(id) {
        uni.navigateTo({
          url: `./new_detail/new_detail?id=${id}`
        })
      }
    }
  }
</script>

<style lang="scss">
  .newsList {
    .newsItem {
      box-sizing: border-box;
      display: flex;
      width: 750rpx;
      height: 170rpx;
      padding: 10rpx 20rpx;
      border-bottom: 1px solid $uni-shop-color;

      image {
        width: 200rpx;
        height: 150rpx;
      }

      .newsDetail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 28rpx;

        .title {
          font-size: 30rpx;
        }

        .btm-msg {
          display: flex;
          justify-content: space-between;
          padding-right: 30rpx;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
