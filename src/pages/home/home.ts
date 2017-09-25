import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpService} from "../../providers/http-service/http-service";
import {NativeService} from "../../providers/NativeService";
import {HomeService} from "./HomeService";
import {GoodPage} from  "./good/good";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {
  select: String;
  schoolName = [];
    /*{name:'北京邮电大学'},
    {name:'吉林大学'},
    {name:'北京师范大学'}*/
  schoolArr = [];
  constructor(public navCtrl: NavController,public nativeService:NativeService,public homeService:HomeService) {
    //初始化schoolName的值
    this.homeService.getObj().subscribe(res => {
      this.schoolName = res;
    });
  }
  scan() {
    this.nativeService.scanQR();
   /* let alert = this.alertCtrl.create({
      title: '扫一扫',
      subTitle: '请后台工作人员编写扫一扫代码',
      buttons: ['OK']
    });
    alert.present();*/
  }
  showDetail(goodId) {
    //请求接口获得指定ID的商品信息。包括溯源，商品状态
    this.navCtrl.push(GoodPage,{
      goodId: goodId
    });
  }
  getSelectedSchool() {
    if(this.select){
      this.schoolArr = []; //清空数组，否则会叠加
      this.homeService.getSchoolContent(this.select).subscribe(res => {
        var data = res;
        for(let i=0;i<data.length;i++){
          this.schoolArr.push(data[i]);
        }
      })
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
  }
}
