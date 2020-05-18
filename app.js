//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this

    const APP_ID = 'wx8d7b3920e3b568c3';//输入小程序appid  
    const APP_SECRET = 'bf9f52f8ac76fb940416a1fab4a32655';//输入小程序app_secret  
    var OPEN_ID = ''//储存获取到openid  
    var SESSION_KEY = ''//储存获取到session_key 

    // 登录
    wx.login({
      success: res => {         
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({              //获取openid接口            
          url: this.globalData.urlString+'/getOpenId',            
        data:{              
          appid:APP_ID,              
          secret:APP_SECRET,              
          js_code:res.code,              
          grant_type:'authorization_code'            
          },            
          method:'GET',            
          success:function(res){              
            console.log(res.data)              
            OPEN_ID = res.data.openid;//获取到的openid              
            SESSION_KEY = res.data.session_key;//获取到session_key    
            // wx.setStorageSync("openid", OPEN_ID.substr(0, 10) + '********' + OPEN_ID.substr(OPEN_ID.length - 8, OPEN_ID.length)) 
            wx.setStorageSync("openid", OPEN_ID)     
            wx.setStorageSync("session_key", SESSION_KEY)
            }          
          })  
      },
    }),        
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    urlString:"https://www.zaza17.top/BookDeer/superadmin"
  }
})