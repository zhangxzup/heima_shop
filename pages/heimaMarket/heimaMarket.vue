<template>
  <view>
    <view class="back">
      <goods-List :goodsList="goodsList" :ok="ok" @goDetail="navigate"></goods-List>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodsList: [],
        ok: false,
        page: 0
      }
    },
    onLoad() {
      //初始化渲染
      this.getGoods();
    },
    onReachBottom() {
      if (this.goodsList.length < this.page * 10) {
        this.ok = true
        return
      }
      this.getGoods();
    },
    onPullDownRefresh() {
      this.page = 0;
      this.goodList = []
      setTimeout(() => {
        this.getGoods(() => {
          uni.stopPullDownRefresh();
        })
      }, 300)
    },
    methods: {
      async getGoods(refsh) {
        this.page++;
        await this.$myRequest({
          url: `/api/getgoods?pageindex=${this.page}`
        }).then((res) => {
          //网络图片不可用，临时换成本地图片地址方便预览效果
          const message = res.data.message.map((item) => {
            item.url = '../../static/12.jpg';
            return item;
          })
          this.goodsList = [...this.goodsList, ...message];
          //
          // this.goodsList = [...this.goodsList, ...res.data.message];这里解除注释后，子组件的item.url换成item.img_url
          //停止下拉刷新
          refsh && refsh();
          console.log(res);
        })
      },
      //商品点击事件，跳转到详情页面
      navigate(id) {
        uni.navigateTo({
          url: '/pages/goods-detail/goods-detail?id=' + id
        })
      }
    }
  }
</script>

<style lang="scss">
  .back {
    background: #eee;
  }
</style>
