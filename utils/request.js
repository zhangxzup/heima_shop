const yuming = "http://localhost:8082";
export const myRequest = ({
  url,
  method,
  data
}) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: yuming + url,
      method: method || "GET",
      data: data || {},
      success: (res) => {
        if (res.data.status != 0) {
          uni.showToast({
            title: '请求数据失败'
          })
        } else {
          resolve(res);
        }
      },
      fail: (err) => {
        reject(err);
        uni.showToast({
          title: '请求接口失败'
        })
      }
    })
  })

}
