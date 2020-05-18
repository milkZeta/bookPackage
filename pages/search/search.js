// pages/search/search.js
const app = getApp()
var urlString = app.globalData.urlString;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseValue:"书名",
    dropdownClass:" dropdownHide",
    search_input:""//搜索输入的内容
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
  },
  byName:function(e){
    let that = this;
    var bywhich = e.currentTarget.dataset.bywhich;
    that.setData({
      chooseValue: bywhich
    })
  },
  byAuthor: function (e) {
    let that=this;
    var bywhich = e.currentTarget.dataset.bywhich;
    that.setData({
      chooseValue: bywhich
    })
  },
  chooseType:function(){
    let that=this;
    var temp="";
    if (that.data.dropdownClass!=""){
       temp="";
    }else{
       temp = " dropdownHide";      
    }
    that.setData({
      dropdownClass: temp
    })
    let hh = that.data.dropdownClass;
  },
  searchInput:function(e){
    this.setData({
      search_input: e.detail.value
    })
    console.log(this.data.search_input)
  },
  searchBook:function(e){
    var that = this;
    var searchInput = this.data.search_input;
    var chooseValue = this.data.chooseValue;
    wx.request({
      url: urlString+'/searchBook',
      method: 'GET',
      data: { searchType: chooseValue, searchInput: searchInput},
      success: function (res) {
        var list = res.data.bookList;
        for (var i = 0; i < list.length; i++) {
          list[i].bookCover = "data:image/png;base64," + list[i].bookCover;
          console.log(list[i].bookCover);
        }
        if (list == null) {
          var toastText = "获取数据失败" + res.data.strMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 6000
          });
        } else {
          that.setData({
            list: list
          })
        }
      }
  })
}
})