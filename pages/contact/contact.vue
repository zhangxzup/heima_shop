<template>
  <view class="contact">
    <image class="img" src="http://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
    <view class="info">
      <view class="call" @click="callUs">
        联系电话：400-618-9090 ( 点击拨打 )
      </view>
      <view class="address">
        校区地址：浙江省杭州市下沙经济开发区4号大街187号盛泰时代山
      </view>
    </view>
    <map :markers="markers" :latitude="latitude" :longitude="longitude" :scale="scale" class="map"></map>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        "latitude": 30.312065,
        "longitude": 120.363192,
        scale: 13,
        'markers': [{
          id: 1,
          latitude: 30.312065,
          longitude: 120.363192,
          title: "黑马程序员",
          iconPath: '../../static/hmlogo.png',
          width: 50,
          height: 50
        }]
      }
    },
    methods: {
      callUs() {
        uni.makePhoneCall({
          phoneNumber: '15633829769'
        })
      }
    }
  }
</script>

<style lang="scss">
  .contact {
    .img {
      width: 750rpx;
      height: 320rpx;
    }

    .info {
      width: 710rpx;
      height: 244rpx;
      padding: 10rpx 20rpx;

      .call {
        font-size: 30rpx;
        border-bottom: 1px solid #eee;
        line-height: 80rpx;
      }

      .address {
        font-size: 30rpx;
        border-bottom: 1px solid #eee;
        line-height: 80rpx;
      }
    }

    .map {
      width: 750rpx;
      height: 750rpx;
    }
  }
</style>
