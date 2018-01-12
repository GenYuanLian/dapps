/**
 * Created by Luffy on 2017/5/27.
 */
import {Component} from '@angular/core';
import {NavController,NavParams,ModalController} from 'ionic-angular';
import {AboutPage} from "../about/about";
import {NameIdentificationPage} from "../name-identification/name-identification";
import {AccountSafePage} from "../account-safe/account-safe";
import {UserInfo} from "../../../model/UserInfo";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SetPage {
  userInfo:UserInfo;
  constructor(private navCtrl: NavController,private navParams: NavParams,private modalCtrl: ModalController) {
    this.userInfo = navParams.get('userInfo');
  }
  userSafe() {
    this.navCtrl.push(AccountSafePage,{
      userName: this.userInfo.username
    });
   /*this.alertCtrl.create({
      title: '二期开发',
      subTitle: '该功能正在开发，敬请期待',
      buttons: ['好']
    }).present();*/
  }
  nameIdentification() {

    this.navCtrl.push(NameIdentificationPage,{
      userInfo:this.userInfo
    });

  }
  about() {
    this.navCtrl.push(AboutPage);
  }
}


