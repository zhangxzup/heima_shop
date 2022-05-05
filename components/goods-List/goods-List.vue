<template>
  <view class="goods-list">
    <view class="goods-item" v-for="(item,index) in goodsList" :key="index" @click="toDetailPage(item.id)">
      <view class="img">
        <image :src="item.url"></image>
      </view>
      <view class="price">
        <text class="sale-price">{{item.sell_price}}</text>
        <text class="market-price">{{item.market_price}}</text>
      </view>
      <view class="goods-name">{{item.title}}</view>
    </view>
    <view class="bottom" v-if="ok">------------&emsp;我是有底线的&emsp;-----------</view>
  </view>

</template>

<script>
  export default {
    props: ['goodsList', 'ok'],
    data() {
      return {};
    },
    //将点击事件和参数传到父级
    methods: {
      toDetailPage(id) {
        this.$emit('goDetail', id);
      }
    }
  }
</script>

<style lang="scss">
  .goods-list {
    padding: 0 14rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    .goods-item {
      width: 354rpx;
      margin: 10rpx 0;
      padding: 14rpx;
      box-sizing: border-box;
      background-color: white;

      .img {
        width: 100%;

        image {
          width: 100%;
          height: 300rpx;
        }
      }

      .price {
        margin: 20rpx 0 4rpx 0;

        .sale-price {
          color: $uni-shop-color;
          font-size: 36rpx;
          margin-right: 16rpx;
        }

        .market-price {
          font-size: 28rpx;
          color: #ccc;
          text-decoration: line-through;
        }
      }

      .goods-name {
        font-size: 28rpx;
        line-height: 50rpx;
        padding: 10rpx 0 14rpx 0;
        margin-bottom: 50rpx;
      }
    }

    .bottom {
      width: 100%;
      text-align: center;
      line-height: 100rpx;
      font-size: 28rpx;
      color: #808080;
    }
  }
</style>
