<template>
  <view>
    <!-- 轮播图部分 -->
    <swiper :indicator-dots="true" circular="true" autoplay="true">
      <swiper-item v-for="(item,index) in imgArr" :key="index">
        <image :src="item.img" mode=""></image>
      </swiper-item>
    </swiper>
    <!-- 导航栏部分 -->
    <view class="font-icon-list">
      <view v-for="(item,index) in font_icon_list" :key="index" class="font-icon-item" @click="goDetail(item.url)">
        <view :class="item.name"></view>
        <text>{{item.title}}</text>
      </view>
    </view>
    <!-- 商品列表 -->
    <view class="goods">
      <view class="hot-title">
        推荐商品
      </view>
      <goods-List :goodsList="goodsList" :ok="ok" @goDetail="navigate"></goods-List>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        imgArr: [],
        goodsList: [],
        pages: 0,
        ok: false,
        font_icon_list: [{
            "name": "iconfont icon-ziyuan",
            "title": "黑马超市",
            "url": "/pages/heimaMarket/heimaMarket"
          },
          {
            "name": "iconfont icon-guanyuwomen",
            "title": "联系我们",
            "url": "/pages/contact/contact"
          },
          {
            "name": "iconfont icon-tupian",
            "title": "社区图片",
            "url": "/pages/pictures/pictures"
          },
          {
            "name": "iconfont icon-shipin",
            "title": "学习视频",
            "url": "/pages/videos/videos"
          }
        ]
      }
    },
    onLoad() {
      this.getSwipers();
      this.getGoodsList();
    },
    onReachBottom() {
      if (this.goodsList.length < this.pages * 10) {
        this.ok = true;
        return;
      }
      this.getGoodsList();

    },
    onPullDownRefresh() {
      this.pages = 0;
      this.goodsList = [];
      clearTimeout(listTimer);
      const listTimer = setTimeout(() => {
        this.getGoodsList(() => {
          uni.stopPullDownRefresh();
        });
      }, 300)

    },
    methods: {
      //获取轮播图数据
      getSwipers() {
        this.$myRequest({
          url: "/api/getlunbo"
        }).then((res) => {
          this.imgArr = res.data.message;
        })
      },
      //获取商品列表
      getGoodsList(refsh) {
        this.pages++;
        this.$myRequest({
          url: `/api/getgoods?pageindex=${this.pages}`
        }).then((res) => {
          //网络图片不可用，临时换成本地图片地址方便预览效果
          const message = res.data.message.map((item) => {
            item.url = '../../static/12.jpg';
            return item;
          })
          this.goodsList = [...this.goodsList, ...message];
          //
          // this.goodsList = [...this.goodsList, ...res.data.message];这里解除注释后，子组件的item.url换成item.img_url
          refsh && refsh();
          console.log(res);
        })
      },
      //导航栏点击跳转事件
      goDetail(url) {
        uni.navigateTo({
          url: url
        })
      },
      //商品点击跳转事件
      navigate(id) {
        uni.navigateTo({
          url: '/pages/goods-detail/goods-detail?id=' + id
        })
      }
    }
  }
</script>

<style lang="scss">
  /* 轮播图 */
  swiper {
    width: 750rpx;
    height: 380rpx;

    swiper-item {
      width: 100%;
      height: 100%;

      image {
        width: 100%;
        height: 100%;
      }
    }
  }

  /* 导航栏 */
  .font-icon-list {
    display: flex;
    justify-content: space-around;

    .font-icon-item {
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: 0 10rpx;

      view {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        background-color: $uni-shop-color;
        color: white;
        text-align: center;
        line-height: 120rpx;
        margin: 20rpx 0;
      }

      text {
        font-size: 30rpx;
      }

    }
  }

  /* 商品列表 */
  .goods {
    background-color: #eee;
    overflow: hidden;
    margin-top: 20rpx;

    .hot-title {
      text-align: center;
      letter-spacing: 40rpx;
      line-height: 100rpx;
      margin: 6rpx 0;
      background-color: white;
      color: $uni-shop-color;
    }


  }
</style>
