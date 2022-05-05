<template>
  <view class="goods-message">
    <!-- 轮播图 -->
    <view class="goods-swiper">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" class="swiper">
        <swiper-item v-for="(item,index) in goodsSwiper" :key="index" class="swiper-item">
          <image :src="item" class="img"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 详情参数 -->

    <view class="goods-info">
      <view class="price-and-name">
        <view class="price">
          <text>{{goodsInfo.sell_price}}</text>
          <text>{{goodsInfo.market_price}}</text>
        </view>

        <view class="goods-name"></view>

      </view>
      <grey-line-full></grey-line-full>
      <view class="code-and-stock">
        <text></text>
        <text></text>
      </view>
    </view>

    <view class="goods-detail">

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //详情轮播图
        goodsSwiper: [],
        //详情参数
        goodsInfo: [],
        //详情介绍
        goodsDetail: []

      }
    },
    onLoad(options) {
      this.getGoodsSwiper(options.id);
      this.getGoodsDetail(options.id);
      this.getGoodsInfo(options.id);
    },
    methods: {
      //获取详情轮播图
      async getGoodsSwiper(id) {
        await this.$myRequest({
          url: `/api/getthumimages/${id}`
        }).then((res) => {
          // this.goodsSwiper = res.data.message.map((item) => {
          //   return item.src;
          // })
          //网络图片已失效，临时添加本地图片地址来预览效果
          this.goodsSwiper = ['../../static/2.jpg', '../../static/12.jpg']
          //
          // console.log(res);
        })
      },
      //获取详情参数
      async getGoodsInfo(id) {
        await this.$myRequest({
          url: `/api/goods/getinfo/${id}`
        }).then((res) => {
          this.goodsInfo = res.data.message[0];
          console.log(res);
        })
      },
      //获取商品详情介绍
      async getGoodsDetail(id) {
        await this.$myRequest({
          url: `/api/goods/getdesc/${id}`
        }).then((res) => {
          this.goodsDetail = res.data.message;
          // console.log(res);
        })
      }


    }
  }
</script>

<style lang="scss">
  .goods-message {
    background-color: #eee;

    .swiper {
      width: 750rpx;
      height: 700rpx;

      .swiper-item {
        width: 100%;
        height: 100%;

        .img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .price-and-name {
      background-color: #fff;
      overflow: hidden;

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
    }
  }
</style>
