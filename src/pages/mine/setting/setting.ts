/**
 * Created by Luffy on 2017/5/27.
 */
import {Component} from '@angular/core';
import {NavController,NavParams,AlertController} from 'ionic-angular';
import {AboutPage} from "../about/about";
import {NameIdentificationPage} from "../name-identification/name-identification";
import {AccountSafePage} from "../account-safe/account-safe";

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SetPage {
  userName:String;
  constructor(private navCtrl: NavController,private navParams: NavParams,private alertCtrl: AlertController) {
    this.userName = navParams.get('userName');
  }
  userSafe() {
    this.navCtrl.push(AccountSafePage,{
      userName: this.userName
    });
   /*this.alertCtrl.create({
      title: '二期开发',
      subTitle: '该功能正在开发，敬请期待',
      buttons: ['好']
    }).present();*/
  }
  nameIdentification() {
    this.navCtrl.push(NameIdentificationPage,{
      userName: this.userName
    })
  }
  about() {
    this.navCtrl.push(AboutPage);
  }
}


