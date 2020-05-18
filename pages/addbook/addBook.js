// pages/addBook/addBook.js
const app = getApp()
var urlString = app.globalData.urlString;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upfilelist:[],
    uploadImgFile:[],
    book_name:'',
    book_auth: '',
    book_publish:'',
    book_desc:''
  }, 
  book_name:function(e){
    this.setData({
      book_name: e.detail.value
    })
  },
  book_auth: function (e) {
    this.setData({
      book_auth: e.detail.value
    })
  },
  book_publish: function (e) {
    this.setData({
      book_publish: e.detail.value
    })
  },
  book_desc: function (e) {
    this.setData({
      book_desc: e.detail.value
    })
  },
  choose_file:function(){
    let _that = this;
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success(res) {
        const tempFiles = res.tempFiles
        let {upfilelist} = _that.data;
        let newupfilelist = upfilelist.concat(tempFiles)
        _that.setData({
          upfilelist: newupfilelist,
        })
      }
    })
  },
  choose_image: function () {
    let _that = this;
    wx.chooseMessageFile({
      count: 10,
      type: 'image',
      success(res) {
        const tempFiles = res.tempFiles
        let { uploadImgFile } = _that.data;
        let newupfilelist = uploadImgFile.concat(tempFiles)
        _that.setData({
          uploadImgFile: newupfilelist,
        })
      }
    })
  },
  open_file:function(e){
    let open_path = e.currentTarget.dataset.path;
    wx.openDocument({
      filePath: open_path,
       success: function(res) {
         console.log(res);
      },
      fail: function(e) {
        toast.basic.showToast({
          title: '打开文件失败 :-)'
        }, that);
      },
      complete: function (res) {
        console.log("complete");
        console.log(res)
      }
    })
  },
  del_file: function (e) {
    let _that = this;
    let del_path = e.currentTarget.dataset.path;
    let {upfilelist,uploadImgFile} = this.data;
    upfilelist.forEach(function (k, index) {
        if(del_path==k.path){
          upfilelist.splice(index,1);
        }
    }),
    uploadImgFile.forEach(function (k, index) {
        if (del_path == k.path) {
          uploadImgFile.splice(index, 1);
        }
      })
    _that.setData({
      upfilelist: upfilelist,
      uploadImgFile: uploadImgFile
      })
  },
  submit_data:function(){
    let that=this;
    var strUploadFile='';
    var strUploadImage = '';
    var bookId;
    for (var i=0; i < that.data.upfilelist.length;i++){
      strUploadFile = that.data.upfilelist[i].path;
    }
    for (var i = 0; i < that.data.uploadImgFile.length; i++) {
      strUploadImage = that.data.uploadImgFile[i].path;
    }
    var owner = wx.getStorageSync('openid') ;
    //上传文件
    wx.uploadFile({
      url: urlString+'/addbook',
      filePath: strUploadFile,
          name: 'file',
          formData: {
            book_name: that.data.book_name,
            book_auth: that.data.book_auth,
            book_publish: that.data.book_publish,
            book_desc: that.data.book_desc,
            owner: owner
          },
          header: {
            "Content-Type": "multipart/form-data;charset:utf-8"
          },
          success: function (res) {
            var toastText="";
            var sucFlag=false;
            bookId = res.data;
            console.log("提交数据成功！");
            wx.uploadFile({
              url: urlString+'/insertBookCover',
              filePath: strUploadImage,
              name: 'image',
              formData: {
                book_id: bookId
              },
              header: {
                "Content-Type": "multipart/form-data;charset=utf-8"
              },
              success: function (res) {
                 toastText = "提交成功！";        
                sucFlag=true;       
              },
              fail: function (res) {
                toastText = "提交失败！"; 
              },
              complete:function(res){
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 3000
                });
                if (sucFlag){
                  wx.navigateTo({
                    url: '../mine/mine'
                  })
                }
              }
            });  
          },
          fail: function (res) {
            console.log("提交数据失败！");
          }
        });
    //上传图片
    
      }
})