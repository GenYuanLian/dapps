/**
 * Created by Luffy on 2017/5/31.
 */
import {Component} from '@angular/core';
import {NavController,NavParams,AlertController} from 'ionic-angular';
import {MineService} from "../MineService";
import {NameIdentificationPage} from "../name-identification/name-identification";

@Component({
  selector: 'page-bullet',
  templateUrl: 'bullet.html',
  providers: [MineService]
})
export class BulletPage {
  userName: string;
  coin:String;
  constructor(private navCtrl: NavController, private mineService: MineService, private navParams: NavParams,private alertCtrl:AlertController) {
    this.userName = navParams.get('userName');
    this.coin = '0';
    this.mineService.getUserIdentification(this.userName).subscribe(res => {
      if(!res['isIdentify']){
        this.alertCtrl.create({
          title: '未实名认证',
          subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
          buttons: [{text: '取消'},
            {
              text: '确定',
              handler: () => {
                navCtrl.push(NameIdentificationPage);
              }
            }
          ]
        }).present();
      }else {
        console.log("已经是实名认证用户");
        this.mineService.getUserBalance(this.userName).subscribe(res => {
          if(res['result']){
            this.coin = res['balance'];
          }else {
            console.log("查询余额失败");
          }
        })
      }
    })
  }
  redPackage() {
    this.mineService.getNewRedPackage(this.userName).subscribe(res => {
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
  coinMarket() {
    this.alertCtrl.create({
      title: '二期开发',
      subTitle: '正在开发，敬请期待',
      buttons: ['确定']
    }).present();
  }
}


