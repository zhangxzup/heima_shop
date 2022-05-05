<template>
  <view class="pics">
    <!-- 左侧菜单栏 -->
    <scroll-view class="left" scroll-y="true">
      <view class="pieces" @click="switchPiece(index,item.id)" :class="index==active?'active':''"
        v-for="(item,index) in pics" :key="item.id">
        {{item.title}}
      </view>
    </scroll-view>
    <!-- 右侧展示区 -->
    <scroll-view class="right" scroll-y="true">
      <view class="cate" v-for="(item,index) in imgs" :key="index">
        <image :src="item.url" @click="previewImg(index)"></image>
        <view class="title">{{item.title}}</view>
        <view class="zhaiyao">{{item.zhaiyao}}</view>
      </view>
      <text v-if="imgs.length==0">暂无数据</text>
    </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //菜单栏数据
        pics: [],
        //存点击态的index
        active: 0,
        //存点击态的id值
        cateId: 0,
        //展示区数据
        imgs: [],
        //图片地址组
        urls: []
      }
    },
    onLoad() {
      this.getpics();
      this.getCates();
      //这是初始化展示区内容的第二种方法
      // var _this = this;
      // setTimeout(() => {
      //   console.log(_this.pics)
      //   this.switchPiece(0, this.pics[0].id);
      //   this.getCates();
      // }, 500)
    },
    methods: {
      //获取菜单栏数据
      getpics() {
        this.$myRequest({
          url: '/api/getimgcategory'
        }).then((res) => {
          this.pics = res.data.message;
          //初始化右侧展示区
          this.switchPiece(0, this.pics[0].id);
          // console.log(res);
        })
      },
      //切换菜单
      switchPiece(index, cateId) {
        this.active = index;
        this.cateId = cateId;
        this.getCates();
      },
      //获取展示区数据
      getCates() {
        this.$myRequest({
          url: `/api/getimages/${this.cateId}`
        }).then((res) => {
          // this.imgs = res.data.message;解除注释后要把 item.url换成item.img_url
          //网络图片已失效，可临时换成本地图片地址预览一下
          this.imgs = res.data.message.map((item) => {
            item.url = '../../static/12.jpg'
            return item;
          })
          //
          //将高亮菜单的右侧展示区的图片地址收集到一个新数组中
          this.urls = this.imgs.map(item => {
            return item.url;
          })
          // console.log(res);
        })
      },
      //预览图片
      previewImg(index) {
        uni.previewImage({
          current: index,
          urls: this.urls
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    height: 100%;
  }

  .pics {
    height: 100%;
    display: flex;

    /* 左侧菜单栏 */
    .left {
      width: 200rpx;
      height: 100%;

      /* 菜单 */
      .pieces {
        box-sizing: border-box;
        width: 100%;
        height: 122rpx;
        line-height: 122rpx;
        text-align: center;
        border-top: 1px solid #eee;
        border-right: 1px solid #eee;
        font-size: 30rpx;
      }

      /* 点击态菜单 */
      .active {
        background-color: $uni-shop-color;
        color: #fff;
      }
    }

    /* 右侧展示区 */
    .right {
      width: 530rpx;
      height: 100%;
      margin: 0 auto;

      .cate {
        font-size: 30rpx;
        line-height: 60rpx;
        padding: 0 10rpx;
      }
    }
  }
</style>
