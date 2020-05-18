// pages/readbook/readbook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:"",
    pageNo:1,
    bookName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bookName: options.bookName
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that=this;
    that.setData({
      content: wx.getStorageSync("readContent")
    })
    var con=that.data.content;
  },
  onContentClick:function(e){
    let that=this;
    //通过坐标判断实在左边还是右边，左翻页和右翻页
    let op_x = e.detail['x'];
    let op_y = e.detail['y'];
    let screenWidth = wx.getSystemInfoSync().windowWidth;
    let pageno = that.data.pageNo;
    //小于屏幕一半，左翻
    if (op_x < screenWidth/2){
      if (pageno!=1){
        that.setData({
          pageNo: pageno-1
        })
      }
    }
    else{
      if (pageno!=that.data.content.length-1) {
        that.setData({
          pageNo: pageno + 1
        })
      }
    }
    let tt=that.data;
  },
  //跳转页数
  pageInput:function(e){
    this.setData({
      pageNo: e.detail.value
    })
  }





})