const { API } = require('./api.js');
const upload=({count,callback})=>{
      let that = this;
      wx.chooseImage({
          count: count,  //最多可以选择的图片总数
          sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              let tempFilePaths = res.tempFilePaths;
              //启动上传等待中...
              wx.showToast({
                  title: '正在上传...',
                  icon: 'loading',
                  mask: true,
                  duration: 10000
              })
              let uploadImgCount = 0;
              for (let i = 0, h = tempFilePaths.length; i < h; i++) {
                  wx.uploadFile({
                      url: API.addPicture,
                      filePath: tempFilePaths[i],
                      name: 'imgFile',
                      formData: {
                          'imgIndex': i
                      },
                      header: {
                          "Content-Type": "multipart/form-data"
                      },
                      success: function (res) {
                          uploadImgCount++;
                          let data = JSON.parse(res.data);
                          console.log(data)
                          //如果是最后一张,则隐藏等待中
                          if (uploadImgCount == tempFilePaths.length) {
                              wx.hideToast();
                          }
                          callback(data)
                      },
                      fail: function (res) {
                          wx.hideToast();
                          wx.showModal({
                              title: '错误提示',
                              content: '上传图片失败',
                              showCancel: false,
                              success: function (res) { }
                          })
                      }
                  });
              }
          }
      });
  };
module.exports = {
    upload
};