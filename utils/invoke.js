const { ajax, API } = require('./api.js');

//登录
const getList = data => ajax({ url: API.list, data: data, method: "GET" });

//上传图片
const updateImg = data => ajax({ url: API.list, data: data, method: "POST" });


module.exports = {
    getList
};