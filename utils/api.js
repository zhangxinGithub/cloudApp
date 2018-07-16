let host = "https://sns.api.moji.com/";
let imgHost = "http://snsup.moji.com";
const ajax = function (opts, head) {
    opts = Object.assign({
        url: "",
        method: "GET",
        filePath: '',
        data: {},
        isCheck: false
    }, opts);

    //创建header 
    /*let header = Object.assign({
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': "applet_geek_t=" + wx.getStorageSync('appTicket') + ";sessionKey=" + wx.getStorageSync('sessionKey')
    }, head);*/

    //进行请求,一般外层都有一个封装,然后放在公共类里边
    return new Promise(function (resolve, reject) {
        wx.request({
            url: opts.url,
            method: opts.method,
            data: opts.data,
            success(res) {
                if (res.statusCode>400){
                    wx.showToast({
                        title: '接口异常',
                        image: '/images/common/fail.png',
                        duration: 2000
                    })
                }
                else
                {
                    if (res.data.error == 1) {
                        //未登录处理
                        if (opts.isCheck) {
                            resolve({
                                rescode: 401,
                                resmsg: "需要登录"
                            });
                        }
                        resolve({
                            rescode: 501,
                            resmsg: res.data.message || res.data.resmsg
                        });
                    } else {
                        //opts.success(res)
                        resolve(res.data);
                    }
                }
                
            },
            fail: function (e) {
                //opts.fail(e)
                reject(e);
                wx.getNetworkType({
                    success: function (res) {
                        // 返回网络类型, 有效值：
                        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
                        var networkType = res.networkType
                        console.log(res)
                        if (networkType == "none") {
                            wx.showToast({
                                title: '网络断开,请检查',
                                image: '/images/common/fail.png',
                                duration: 2000
                            })
                        }
                        else {
                            wx.showToast({
                                title: '接口异常',
                                image: '/images/common/fail.png',
                                duration: 2000
                            })
                        }
                    }
                })


            }
        })
    })
}

const API = {
    "list": host + "/forum/cloud/json/cloud_homepage",
    "updateImg": imgHost + "/snsupload/upload/json/upload",
};

module.exports = {
    API,
    ajax
};