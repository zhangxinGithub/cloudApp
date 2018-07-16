// pages/job_all/job_all.js
const {getList} = require('../../utils/invoke.js');
Page({
    cache: {
        setLocationScope: false,    //记录是否进入过授权位置页面
        hasNextPage: false,
        appendCategoryList: [],
        count: 0,
        param: {
            page: 1,
            lng: -1,
            lat: -1,
            positionCode: -1,
            // dist: 1,
            // cityCode: 1,
            // positionId: 1,
            // district: 1,
            // area: 1,
            // salaryCode: 1,
            // sortType: 1
        }
    },

    /**
     * 页面的初始数据
     */
    data: {
        loadComplete: false,
        loadMoreComplete: false,
        filterKey: "",
        filterList: [],
        jobList: [],
        jobCategory: {
            show: false,
            list: [],
            code: -1,
            name: "全部职位"
        },

        position: "absolute"

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("job_all onload")
        getList({'reqForm.page_past':0,'reqForm.page_length':20,'reqForm.page_cursor':''}).then((res)=>{
            console.log(res)
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        console.log("job_all ready");
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log("job_all onShow")

    },
    openPhone(){

    }

})