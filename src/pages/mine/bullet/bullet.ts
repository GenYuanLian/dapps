/**
 * Created by Luffy on 2017/5/31.
 */
import {Component} from '@angular/core';
import {NavController,NavParams,AlertController,ModalController} from 'ionic-angular';
import {MineService} from "../MineService";
import {NameIdentificationPage} from "../name-identification/name-identification";
import {PaymentPage} from "./payment/payment";
import {ReceiptPage} from "./receipt/receipt";
import {QueryTransactionPage} from "./query-transaction/query-transaction";
import {TradingRecordPage} from "./trading-record/trading-record";
import {UserInfo} from "../../../model/UserInfo";

@Component({
  selector: 'page-bullet',
  templateUrl: 'bullet.html',
  providers: [MineService]
})
export class BulletPage {
  userInfo: UserInfo;
  coin:String;
  RMB:String;
  constructor(private navCtrl: NavController, private mineService: MineService, private navParams: NavParams,private modalCtrl: ModalController,private alertCtrl:AlertController) {
    this.userInfo = navParams.get('userInfo');
    this.coin = '0';
    this.RMB='0';
    console.log(this.userInfo);
    this.mineService.getUserIdentification(this.userInfo.username).subscribe(res => {
      if(!res['isIdentify']){
        this.userInfo.identification=false;
        this.alertCtrl.create({
          title: '未实名认证',
          subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
          buttons: [
            {
              text: '取消',
             },
            {
              text: '确定',
              handler: () => {
                this.navCtrl.push(NameIdentificationPage,{
                  userInfo:this.userInfo
                });
              }
            }
          ]
        }).present();
      }else {
        console.log("已经是实名认证用户");
        this.userInfo.identification=true;
        this.mineService.getUserBalance(this.userInfo.username).subscribe(res => {
          if(res['result']){
            console.log(res)
            this.coin = res['balance'];
            this.userInfo.bcAddress=res['bcAddress'];
          }else {
            console.log("查询余额失败");
          }
        })
      }
    })
  }
  redPackage() {
    this.mineService.getNewRedPackage(this.userInfo.username).subscribe(res => {
      if(res['result']){//领取成功
        this.alertCtrl.create({
          title: '新人红包',
          subTitle: '恭喜您获得新人红包:100代币，已经存入您的代币账户。',
          buttons: ['确定']
        }).present();
      }else {
        this.alertCtrl.create({
         title: '领取信息',
         subTitle: '您已领取过新人红包，请勿重复领取！',
         buttons: ['确定']
         }).present();
      }
    })
  }
  payment(){
    var userinfo = this.userInfo;
    if(!userinfo.identification){
      this.alertCtrl.create({
        title: '未实名认证',
        subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '确定',
            handler: () => {
              this.navCtrl.push(NameIdentificationPage,{
                userinfo:userinfo
              });
            }
          }
        ]
      }).present();
    }
    else {
      console.log(userinfo);
      this.navCtrl.push(PaymentPage,{
        userinfo: userinfo
      });
    }
  }
  receipt(){
    var  userinfo = this.userInfo;
    if(!userinfo.identification){
      this.alertCtrl.create({
        title: '未实名认证',
        subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '确定',
            handler: () => {
              this.navCtrl.push(NameIdentificationPage,{
                userinfo:userinfo
              });
            }
          }
        ]
      }).present();
    }
    else {
      console.log(userinfo);
      this.navCtrl.push(ReceiptPage,{
        userinfo: userinfo
      });
    }
  }
  QueryTransaction(){
    var  userinfo = this.userInfo;
    if(!userinfo.identification){
      this.alertCtrl.create({
        title: '未实名认证',
        subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '确定',
            handler: () => {
              this.navCtrl.push(NameIdentificationPage,{
                userInfo:userinfo
              });
            }
          }
        ]
      }).present();
    }
    else {
      console.log(userinfo);
      this.navCtrl.push(QueryTransactionPage,{
        userinfo:userinfo
      });
    }
  }
  TransactionRecord(){
    var  userinfo = this.userInfo;
    if(!userinfo.identification){
      this.alertCtrl.create({
        title: '未实名认证',
        subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
        buttons: [
          {
            text: '取消',
          },
          {
            text: '确定',
            handler: () => {
              this.navCtrl.push(NameIdentificationPage,{
                userinfo:userinfo
              });
            }
          }
        ]
      }).present();
    }
    else {
      console.log(userinfo);
      this.navCtrl.push(TradingRecordPage,{
        userinfo: userinfo
      });
    }
  }
}


