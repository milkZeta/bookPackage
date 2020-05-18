const app = getApp()
var urlString = app.globalData.urlString;
// pages/tes/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    section_list:[],
    alphe:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    cover:"",
    hideStatus:".block_hide",
    bookId:"",
    bookFilePath:"",
    bookName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var that = this;
    var owner = wx.getStorageSync('openid');
    wx.request({
      url: urlString+'/queryMineBookList',
      method: 'GET',
      data: { owner:owner},
      success: function (res) {
        var list = res.data;
        if (list == null) {
          var toastText = "获取数据失败" + res.data.strMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 6000
          });
        } else {
          let { section_list } = that.data;
          that.setData({
            // 后台格式保存为Map<Char,List<String>>
            section_list: list
          })
        }
      },
      complete:function(res){
        var list = res.data;
      }
    })
  },

  add_click:function(){
   wx.navigateTo({
     url: '../addbook/addBook'
   })
  },
  deleteResource: function (e) {
    var that = this;
    var owner = wx.getStorageSync('openid');
    let bookid = this.data.bookId;
    wx.request({
      url: urlString+'/deleteMineBookList',
      method: 'GET',
      data: { owner: owner,
              book_id:bookid},
      success: function (res) {
        var list = res.data;
        if (list == null) {
          var toastText = "获取数据失败" + res.data.strMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 6000
          });
        } else {
          let { section_list } = that.data;
          that.setData({
            // 后台格式保存为Map<Char,List<String>>
            section_list: list
          })
        }
      }
    })
  },
  showBookPicture:function(e){
    let that=this;
    let cover = "data:image/png;base64," +e.currentTarget.dataset.cover;
    let bookid =  e.currentTarget.dataset.bookid;
    let bookname = e.currentTarget.dataset.bookname;
    let bookFilePath = e.currentTarget.dataset.bookfilepath;
    that.setData({
      // 后台格式保存为Map<Char,List<String>>
      cover: cover,
      hideStatus:"",
      bookId: bookid,
      bookFilePath: bookFilePath,
      bookName: bookname
    })
  },
  closeImg:function(){
    this.setData({
      hideStatus: ".block_hide"
    })
  },
  downloadResource:function(){
    var bookId = this.data.bookId;
    wx.downloadFile({
      url: urlString+'/downloadResource?bookId='+bookId,
      method: 'GET',
      success: function (res) {
        var rr = res.tempFilePath;
        var toastText = "下载资源成功";
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 3000
      })
    }
    })
  },
  shareResource:function(e){
    var bookId=this.data.bookId;
    wx.request({
      url: urlString+'/shareResource',
      method: 'GET',
      data: { bookId: bookId },
      success: function (res) {
        var rr = res.tempFilePath;
        var toastText = "分享资源成功";
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 3000
        });
      }
    })
  },
  readResource: function (e) {
    var bookId = this.data.bookId;
    var bookName = this.data.bookName;
    let urlStr = urlString;
    wx.request({
      url: urlString+'/readResource',
      method: 'GET',
      data: { bookId: bookId },
      success: function (res) {
        wx.setStorageSync('readContent',res.data);
        wx.navigateTo({
          url: '../readbook/readbook?bookName=' + bookName
        })
      }
    })
  }
})