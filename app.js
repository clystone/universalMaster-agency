(function () {
  'use strict';
  let myApp = angular.module("myApp", ['ui.router', 'ui.bootstrap']);
  // const url = 'http://192.168.2.102:8080';
  const url = 'https://shifu.jack-kwan.com';
  myApp.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    $httpProvider.interceptors.push('loginLoseEfficacy');
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state("blankPage", {
        url: "/",
        templateUrl: "blankPage/blankPage.view.html",
        controller: 'blankPageCtr'
      })
      .state("login", {
        url: "/login",
        templateUrl: "login.html",
        controller: 'LoginCtr'
      })
      .state("relate", {
        url: "/relate",
        templateUrl: "relate/relate.view.html",
        controller: 'relateCtr'
      })
      .state("myUser", {
        url: "/myUser",
        templateUrl: "myUser/myUser.view.html",
        controller: 'myUserCtr'
      })
      .state("me", {
        url: "/me",
        templateUrl: "me/me.view.html",
        controller: 'meCtr'
      })
      .state("record", {
        url: "/record",
        templateUrl: "record/record.view.html",
        controller: 'recordCtr'
      })
      .state("invitationCard", {
        url: "/invitationCard",
        templateUrl: "invitationCard/invitationCard.view.html",
        controller: 'invitationCardCtr'
      })
      .state("myInvitationCard", {
        url: "/myInvitationCard",
        templateUrl: "myInvitationCard/myInvitationCard.view.html",
        controller: 'myInvitationCardCtr'
      })
  });

  myApp.controller('blankPageCtr', ['$scope', '$http', '$timeout', 'locals', '$state', '$window', function ($scope, $http, $timeout, locals, $state, $window) {
    let token = getQueryString("token");
    let relate = getQueryString("relate");
    window.localStorage.setItem('token', token);
    locals.set("userToken", token);
    console.log(token);
    console.log(relate);
    // console.log(Math.round(Math.random()*1000000));

    if (!token) {
      $.alert({text: '系统异常'});
      console.log(111);
    }

    else if (relate == 'true') {
      // $state.go("relate");
      $window.location.href = "http://shifu.jack-kwan.com/agency/index.html#/relate"
    }
    else if (relate == 'false') {
      $window.location.href = "http://shifu.jack-kwan.com/agency/index.html#/me"
      // $state.go("me")
    }


    // let token = locals.get("userToken");
    // $scope.role = locals.get("role");
    // $scope.id = locals.get("id");
    // // document.body.style.backgroundColor = '#eeeeee';
    // $http.get(url + '/api/agency/getPic/2', {headers:{"TOKEN": token}})
    //   .then(function (res) {
    //     console.log(res.data);
    //     if (res.data.info == 1){
    //       $scope.imgUrl = res.data.parms.url;
    //     }
    //   });
    function getQueryString(name) {
      let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      let r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }

    // $state.go("relate")

  }]);

  // myApp.controller('LoginCtr', ['$scope', '$http', '$timeout', 'locals', '$state', function ($scope, $http, $timeout, locals, $state) {
  //   let currentPhone = locals.get("phone");
  //   let currentPassword = locals.get("password");
  //   if(currentPhone){
  //     // console.log('111');
  //     $http.post(url + '/api/agency/login', {
  //       phone: currentPhone,
  //       pw: currentPassword
  //     })
  //       .then(function (res) {
  //         console.log(res.data);
  //         if (res.data.info == 1){
  //           $scope.role = res.data.parms.role;
  //           locals.set("phone", currentPhone);
  //           locals.set("password", currentPassword);
  //           locals.set("userToken", res.data.parms.token);
  //           locals.set("role", res.data.parms.role);
  //           locals.set("id", res.data.parms.id);
  //           $state.go("me");
  //         }
  //         else{
  //           $.weui.alert({text: res.data.msg});
  //         }
  //       })
  //   }
  //   $scope.LoginIn = function () {
  //     $http.post(url + '/api/agency/login', {
  //       phone: $scope.phone,
  //       pw: $scope.password
  //     })
  //       .then(function (res) {
  //         console.log(res.data);
  //         if (res.data.info == 1){
  //           $scope.role = res.data.parms.role;
  //           locals.set("phone", $scope.phone);
  //           locals.set("password", $scope.password);
  //           locals.set("userToken", res.data.parms.token);
  //           locals.set("role", res.data.parms.role);
  //           locals.set("id", res.data.parms.id);
  //           $state.go("me");
  //         }
  //         else{
  //           $.weui.alert({text: res.data.msg});
  //         }
  //       })
  //   };
  //   $.weui = {};
  //   $.weui.alert = function (options) {
  //     options = $.extend({title: '警告', text: '警告内容'}, options);
  //     var $alert = $('.weui_dialog_alert');
  //     $alert.find('.weui_dialog_title').text(options.title);
  //     $alert.find('.weui_dialog_bd').text(options.text);
  //     $alert.on('touchend click', '.weui_btn_dialog', function () {
  //       $alert.hide();
  //     });
  //     $alert.show();
  //   };
  // }]);

  myApp.controller('relateCtr', ['$scope', '$http', '$timeout', 'locals', '$state', function ($scope, $http, $timeout, locals, $state) {
    let token = locals.get("userToken");

    $scope.LoginIn = function () {
      $http.post(url + '/api/agency/relate', {
        phone: $scope.phone,
        pw: $scope.password
      }, {headers: {"TOKEN": token}})
        .then(function (res) {
          console.log(res.data);
          if (res.data.info == 1) {
            // $scope.role = res.data.parms.role;
            // locals.set("phone", $scope.phone);
            // locals.set("password", $scope.password);
            // locals.set("userToken", res.data.parms.token);
            // locals.set("role", res.data.parms.role);
            // locals.set("id", res.data.parms.id);
            locals.set("userToken", res.data.parms.token);
            $state.go("me");
          }
          else {
            $.alert({text: res.data.msg});
          }
        })
    };

  }]);

  myApp.controller('myUserCtr', ['$scope', '$http', '$timeout', 'locals', '$state', '$stateParams', function ($scope, $http, $timeout, locals, $state, $stateParams) {
    // document.body.style.backgroundColor = '#eeeeee';
    let token = locals.get("userToken");
    $scope.role = locals.get("role");
    $scope.id = locals.get("id");
    // console.log(params);

    if ($scope.role == 2) {
      $http.get(url + '/api/agency/finduserhouse?page=1&size=100', {headers: {"TOKEN": token}})
        .then(function (res) {
          console.log(res.data);
          if (res.data.info == 18) {
            $state.go("login")
          }
          else if (res.data.info == 1) {
            $scope.user = res.data.parms.users;
            $scope.maxSize = res.data.parms.maxSize;
          }
        })
    }
    else if ($scope.role == 1) {
      $http.get(url + '/api/agency/finduserup?page=1&size=100', {headers: {"TOKEN": token}})
        .then(function (res) {
          console.log(res.data);
          if (res.data.info == 18) {
            $state.go("login")
          }
          else if (res.data.info == 1) {
            $scope.user = res.data.parms.users;
            $scope.maxSize = res.data.parms.maxSize;
          }
        })
    }

    // $http.get(url + '/api/agency/findmy', {headers: {"TOKEN": token}})
    //   .then(function (res) {
    //     console.log(res.data);
    //   })

  }]);

  myApp.controller('meCtr', ['$scope', '$http', '$timeout', 'locals', '$state', function ($scope, $http, $timeout, locals, $state) {
    let token = locals.get("userToken");
    // $scope.role = locals.get("role");
    // $scope.id = locals.get("id");
    // document.body.style.backgroundColor = '#eeeeee';
    $http.get(url + '/api/agency/findmy', {headers: {"TOKEN": token}})
      .then(function (res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.agency = res.data.parms.agency;
          $scope.role = res.data.parms.agency.role;
          $scope.agencyId = res.data.parms.agency.id;
          $scope.scanCode = 'https://shifu.jack-kwan.com/images/agency/qrc' + $scope.agencyId + '.jpg?random=' + Math.round(Math.random() * 1000000);
          console.log($scope.scanCode);
          locals.set("role", res.data.parms.agency.role)
        }
      });
    console.log($scope.scanCode);

    $http.get(url + '/api/agency/getPic/1', {headers: {"TOKEN": token}})
      .then(function (res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.imgUrl = res.data.parms.url + '?random=' + Math.round(Math.random() * 1000000);
        }
      });

    // $scope.loginOut = ()=>{
    //   locals.set("phone", '');
    //   locals.set("password", '');
    //   $state.go("login")
    // };

    $scope.toSubmitInvitationCard = () => {
      $state.go("invitationCard")
    };

    $scope.toInvitationCard = () => {
      $state.go("myInvitationCard")
    }

  }]);

  myApp.controller('recordCtr', ['$scope', '$http', '$timeout', 'locals', '$state', function ($scope, $http, $timeout, locals, $state) {
    let token = locals.get("userToken");
    $scope.role = locals.get("role");
    $scope.id = locals.get("id");
    // document.body.style.backgroundColor = '#eeeeee';
    $scope.toast = '正在加载中...';

    let myDate = new Date();
    let currentYear = myDate.getFullYear();
    let currentMonth = myDate.getMonth() + 1;
    console.log(currentYear);
    console.log(currentMonth);
    $("#trigger1").text(currentYear);
    $("#trigger2").text(currentMonth);
    $scope.loading = true;

    $http.get(url + '/api/order/getMonData/' + currentYear + '/' + currentMonth, {headers: {"TOKEN": token}})
      .then(function (res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.searchData = true;
          $scope.num = res.data.parms.num;
          $scope.sum = res.data.parms.sum;
        }
      });
    $http.get(url + '/api/order/getMonWater/' + currentYear + '/' + currentMonth + '?page=1&size=30', {headers: {"TOKEN": token}})
      .then(function (res) {
        console.log(res.data);
        $scope.loading = false;
        if (res.data.info == 1) {
          $scope.orders = res.data.parms.orders;
        }
      });

    // $http.get(url + '/api/agency/findmy', {headers:{"TOKEN": token}})
    //   .then(function (res) {
    //     console.log(res.data);
    //     if (res.data.info == 1){
    //       $scope.agency = res.data.parms.agency;
    //     }
    //   })
    var mobileSelect1 = new MobileSelect({
      trigger: '#trigger1',
      title: '选择年份',
      wheels: [
        {data: ['2017', '2018', '2019']}
      ],
      position: [0], //初始化定位
      callback: function () {
        $("#trigger2").text("选择月份")
      }
    });
    var mobileSelect1 = new MobileSelect({
      trigger: '#trigger2',
      title: '选择月份',
      wheels: [
        {data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
      ],
      position: [5], //初始化定位
      callback: function () {
        let year = $("#trigger1").text();
        let month = $("#trigger2").text();

        if (year == '选择年份') {
          $.weui.alert({text: '请先选择年份'});
        }
        else if (month == '选择月份') {
          $.weui.alert({text: '请先选择月份'});
        }
        else {
          $scope.loading = true;
          $http.get(url + '/api/order/getMonData/' + year + '/' + month, {headers: {"TOKEN": token}})
            .then(function (res) {
              console.log(res.data);
              if (res.data.info == 1) {
                $scope.searchData = true;
                $scope.num = res.data.parms.num;
                $scope.sum = res.data.parms.sum;
              }
            });
          $http.get(url + '/api/order/getMonWater/' + year + '/' + month + '?page=1&size=30', {headers: {"TOKEN": token}})
            .then(function (res) {
              console.log(res.data);
              $scope.loading = false;
              if (res.data.info == 1) {
                $scope.orders = res.data.parms.orders;
              }
            })
        }
      }
    });
    $.weui = {};
    $.weui.alert = function (options) {
      options = $.extend({title: '警告', text: '警告内容'}, options);
      var $alert = $('.weui_dialog_alert');
      $alert.find('.weui_dialog_title').text(options.title);
      $alert.find('.weui_dialog_bd').text(options.text);
      $alert.on('touchend click', '.weui_btn_dialog', function () {
        $alert.hide();
      });
      $alert.show();
    };

    // $scope.searchRecord = function () {
    //   console.log($("#trigger1").text());
    //   console.log($("#trigger2").text());
    //   let year = $("#trigger1").text();
    //   let month = $("#trigger2").text();
    //
    //   if (year == '选择年份'){
    //     $.weui.alert({text: '请先选择年份'});
    //   }
    //   else if(month == '选择月份'){
    //     $.weui.alert({text: '请先选择月份'});
    //   }
    //   else{
    //     $http.get(url + '/api/order/getMonData/'+ year +'/'+ month, {headers:{"TOKEN": token}})
    //       .then(function (res) {
    //         console.log(res.data);
    //         if (res.data.info == 1){
    //           $scope.searchData = true;
    //           $scope.num = res.data.parms.num;
    //           $scope.sum = res.data.parms.sum;
    //         }
    //       });
    //     $http.get(url + '/api/order/getMonWater/'+ year +'/'+ month+'?page=1&size=30', {headers:{"TOKEN": token}})
    //       .then(function (res) {
    //         console.log(res.data);
    //         if (res.data.info == 1){
    //           $scope.orders = res.data.parms.orders;
    //         }
    //       })
    //   }
    // }

  }]);

  myApp.controller('invitationCardCtr', ['$scope', '$http', '$timeout', 'locals', '$state', function ($scope, $http, $timeout, locals, $state) {
    let token = locals.get("userToken");
    // document.body.style.backgroundColor = '#eeeeee';
    $scope.show = true;


    $http.get(url + '/api/agency/getPic/1', {headers: {"TOKEN": token}})
      .then(function (res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.imgUrl = res.data.parms.url + '?random=' + Math.round(Math.random() * 1000000);
        }
      });

    $scope.submitData = () => {
      $http.post(url + "/api/file/uploadAgencyHead", $scope.formData, {
        transformRequest: angular.identity,
        headers: {"TOKEN": token, "Content-Type": undefined}
      })
        .then(res => {
          console.log(res.data);
          if (res.data.info == 1) {
            $scope.toast = '上传成功';
            $scope.uploading = true;
            $timeout(function () {
              $scope.uploading = false;
              $state.reload();
            }, 1000);
          }
          else {
            $scope.toast = '上传失败';
            $scope.uploading = true;
            $timeout(function () {
              $scope.uploading = false;
              $state.reload();
            }, 1000);
          }

        });
      // $scope.toast = '上传中...';
      //   $scope.uploading = true;
      //   $.ajax({
      //     type: "POST",
      //     url: url + "/api/file/uploadAgencyHead",
      //     data: $scope.formData,
      //     headers: {
      //       TOKEN: token
      //     },
      //     cache: false,
      //     contentType: false,
      //     processData: false,
      //     success: function (res) {
      //       console.log(res);
      //     },
      //     fail:function (err) {
      //       console.log(err);
      //     }
      //   }).then(res=>{
      //     console.log(res);
      //     if (res.info == 1){
      //     $scope.toast = '上传成功';
      //   }else{
      //     $scope.toast = '上传失败';
      //   }
      //   $timeout(function () {
      //     $scope.uploading = false;
      //     $state.reload();
      //   }, 1000);
      // });
    };

    //上传图片的处理及压缩
    $(function () {
      // 允许上传的图片类型
      var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
      // 图片最大宽度
      // var maxWidth = 100*1024;
      // 最大上传图片数量
      var maxCount = 1;
      $('.js_file').on('change', function (event) {
        var files = event.target.files;
        // 如果没有选中文件，直接返回
        if (files.length === 0) {
          return;
        }

        for (var i = 0, len = files.length; i < len; i++) {
          var file = files[i];
          var reader = new FileReader();

          // 如果类型不在允许的类型范围内
          if (allowTypes.indexOf(file.type) === -1) {
            $.weui.alert({text: '该类型不允许上传'});
            continue;
          }

          if ($('.weui_uploader_file').length >= maxCount) {
            $.weui.alert({text: '最多只能上传' + maxCount + '张图片'});
            return;
          }

          reader.onload = function (e) {
            var img = new Image();
            img.onload = function () {
              // 不要超出最大宽度
              var that = this;
              // 默认按比例压缩
              var w = that.width,
                h = that.height;
              var ratio;
              if ((ratio = w * h / 4000000) > 1) {
                ratio = Math.sqrt(ratio);
                w /= ratio;
                h /= ratio;
              } else {
                ratio = 1;
              }
              var canvas = document.createElement('canvas');
              var ctx = canvas.getContext('2d');

              var tCanvas = document.createElement("canvas");
              var tctx = tCanvas.getContext("2d");
              // 设置 canvas 的宽度和高度
              canvas.width = w;
              canvas.height = h;
              //铺底色
              ctx.fillStyle = "#fff";
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              //如果图片像素大于100万则使用瓦片绘制
              var count;
              if ((count = w * h / 1000000) > 1) {
                count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片

//            计算每块瓦片的宽和高
                var nw = ~~(w / count);
                var nh = ~~(h / count);

                tCanvas.width = nw;
                tCanvas.height = nh;

                for (var i = 0; i < count; i++) {
                  for (var j = 0; j < count; j++) {
                    tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                  }
                }
              } else {
                ctx.drawImage(img, 0, 0, w, h);
              }
              // tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
              // ctx.drawImage(img, 0, 0, w, h);
              var base64 = canvas.toDataURL('image/jpeg', 0.3);

              var $preview = $('<li class="weui_uploader_file" style="background-image:url(' + base64 + ')"></li>');
              $('.weui_uploader_files').append($preview);
              var num = $('.weui_uploader_file').length;
              $('.js_counter').text(num + '/' + maxCount);
              $scope.formData = new FormData();
              var bl = convertBase64UrlToBlob(base64);
              $scope.formData.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg");
              console.log($scope.formData);
            };

            img.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });

    });

    function convertBase64UrlToBlob(urlData) {
      var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {type: mime});
    }

    $.weui = {};
    $.weui.alert = function (options) {
      options = $.extend({title: '警告', text: '警告内容'}, options);
      var $alert = $('.weui_dialog_alert');
      $alert.find('.weui_dialog_title').text(options.title);
      $alert.find('.weui_dialog_bd').text(options.text);
      $alert.on('touchend click', '.weui_btn_dialog', function () {
        $alert.hide();
      });
      $alert.show();
    };
  }]);

  myApp.controller('myInvitationCardCtr', ['$scope', '$http', '$timeout', 'locals', '$state', function ($scope, $http, $timeout, locals, $state) {
    let token = locals.get("userToken");
    $scope.role = locals.get("role");
    $scope.id = locals.get("id");
    // document.body.style.backgroundColor = '#eeeeee';
    $http.get(url + '/api/agency/getPic/2', {headers: {"TOKEN": token}})
      .then(function (res) {
        console.log(res.data);
        if (res.data.info == 1) {
          $scope.imgUrl = res.data.parms.url;
        }
      });

  }]);

  myApp.factory('locals', ['$window', function ($window) {
    return {        //存储单个属性
      set: function (key, value) {
        $window.localStorage[key] = value;
      },        //读取单个属性
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },        //存储对象，以JSON格式存储
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);//将对象以字符串保存
      },        //读取对象
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');//获取字符串并解析成对象
      }

    }
  }]);

  myApp.factory('loginLoseEfficacy', ['$log', '$window', function ($log, $window) {
    $log.debug('$log is here to show you that this is a regular factory with injection');
    return {
      requestError: function (rejection) {
        console.log(rejection);
        console.log('请求失败');
        return rejection;
      },
      request: function (config) {
        // config.requestTimestamp = new Date().getTime();
        return config;
      },
      response: function (response) {
        // response.config.responseTimestamp = new Date().getTime();
        if (response.data.info == 18) {
          console.log('登录失效');
          window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb969b27be3b86b16&redirect_uri=http%3a%2f%2fshifu.jack-kwan.com%2fapi%2fpc%2frelate3&response_type=code&scope=snsapi_userinfo&state=0#wechat_redirect";
        }
        else if (response.data.info == 7) {
          console.log(777);
        }
        return response;
      },
      responseError: function (rejection) {
        console.log(rejection);
        console.log("响应失败");
        return rejection;
      }
    };
  }]);


})();