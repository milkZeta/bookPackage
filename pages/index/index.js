//index.js
//获取应用实例
const app = getApp()
var urlString = app.globalData.urlString;

Page({data: {
  background: ['/pages/images/we003.jpg', '/pages/images/we004.jpg', '/pages/images/we005.jpg'],
  indicatorDots: true,
  vertical: false,
  autoplay: false,
  interval: 2000,
  duration: 500
  },
  onLoad: function () {},

  onShow:function(){
   var that=this;    
   wx.request({
     url: urlString+'/listbook',
     method:'GET',
     data:{},
     success:function(res){
       var list=res.data.bookList;
       for(var i=0;i<list.length;i++){
         list[i].bookCover = "data:image/png;base64," +list[i].bookCover;
         console.log(list[i].bookCover) ;
       }
       if(list==null){
         var toastText="获取数据失败"+res.data.strMsg;
       wx.showToast({
         title: toastText,
         icon:'',
         duration:6000
       });
      } else {
       that.setData({
         list:list
       })
       }
     },
     fail: function (res) {
       let ss=res;
     },
     complete:function(res){
       let ss=res;
     }
   })
  }
})