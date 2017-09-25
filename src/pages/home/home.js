"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeService_1 = require("./HomeService");
var good_1 = require("./good/good");
var HomePage = (function () {
    function HomePage(navCtrl, nativeService, homeService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.nativeService = nativeService;
        this.homeService = homeService;
        this.schoolName = [];
        /*{name:'北京邮电大学'},
        {name:'吉林大学'},
        {name:'北京师范大学'}*/
        this.schoolArr = [];
        //初始化schoolName的值
        this.homeService.getObj().subscribe(function (res) {
            _this.schoolName = res;
        });
    }
    HomePage.prototype.scan = function () {
        this.nativeService.scanQR();
        /* let alert = this.alertCtrl.create({
           title: '扫一扫',
           subTitle: '请后台工作人员编写扫一扫代码',
           buttons: ['OK']
         });
         alert.present();*/
    };
    HomePage.prototype.showDetail = function (goodId) {
        //请求接口获得指定ID的商品信息。包括溯源，商品状态
        this.navCtrl.push(good_1.GoodPage, {
            goodId: goodId
        });
    };
    HomePage.prototype.getSelectedSchool = function () {
        var _this = this;
        if (this.select) {
            this.schoolArr = []; //清空数组，否则会叠加
            this.homeService.getSchoolContent(this.select).subscribe(function (res) {
                var data = res;
                for (var i = 0; i < data.length; i++) {
                    _this.schoolArr.push(data[i]);
                }
            });
        }
        /* if(this.select){
           var obj1 =  {
             date:"2017-05-20",
             schoolContent: [
               {
                 goodType: '牛奶',
                 goodList:[
                   {
                     goodId:'123456',
                     goodName: '三鹿奶粉'
                   },
                   {
                     goodId:'123456',
                     goodName: '三鹿奶粉'
                   }
                 ]
               },
               {
                 goodType: '大米',
                 goodList:[
                   {
                     goodId:'654321',
                     goodName: '一袋大米'
                   },
                   {
                     goodId:'654321',
                     goodName: '两袋大米'
                   }
                 ]
               }
             ]
           };
           var obj2 = {
             date:"2017-05-19",
             schoolContent: [
               {
                 goodType: '牛奶',
                 goodList:[
                   {
                     goodId:'123456',
                     goodName: '三鹿奶粉'
                   },
                   {
                     goodId:'123456',
                     goodName: '三鹿奶粉'
                   }
                 ]
               },
               {
                 goodType: '大米',
                 goodList:[
                   {
                     goodId:'654321',
                     goodName: '一袋大米'
                   },
                   {
                     goodId:'654321',
                     goodName: '两袋大米'
                   }
                 ]
               }
             ]
           };
           this.schoolArr.push(obj1);
           this.schoolArr.push(obj2);
         }*/
        /*this.homeService.getObj().subscribe(res => {
          this.schoolName = res;
          if(this.select){
            var obj1 =  {
              date:"2017-05-20",
              schoolContent: [
                {
                  goodType: '牛奶',
                  goodList:[
                    {
                      goodId:'123456',
                      goodName: '三鹿奶粉'
                    },
                    {
                      goodId:'123456',
                      goodName: '三鹿奶粉'
                    }
                  ]
                },
                {
                  goodType: '大米',
                  goodList:[
                    {
                      goodId:'654321',
                      goodName: '一袋大米'
                    },
                    {
                      goodId:'654321',
                      goodName: '两袋大米'
                    }
                  ]
                }
              ]
            };
            var obj2 = {
              date:"2017-05-19",
              schoolContent: [
                {
                  goodType: '牛奶',
                  goodList:[
                    {
                      goodId:'123456',
                      goodName: '三鹿奶粉'
                    },
                    {
                      goodId:'123456',
                      goodName: '三鹿奶粉'
                    }
                  ]
                },
                {
                  goodType: '大米',
                  goodList:[
                    {
                      goodId:'654321',
                      goodName: '一袋大米'
                    },
                    {
                      goodId:'654321',
                      goodName: '两袋大米'
                    }
                  ]
                }
              ]
            };
            this.schoolArr.push(obj1);
            this.schoolArr.push(obj2);
          }
        });*/
    };
    return HomePage;
}());
HomePage = __decorate([
    core_1.Component({
        selector: 'page-home',
        templateUrl: 'home.html',
        providers: [HomeService_1.HomeService]
    })
], HomePage);
exports.HomePage = HomePage;
