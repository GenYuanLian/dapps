/**
 * Created by Gjp on 2017/9/19.
 */
import {Component} from '@angular/core';
import {ModalController, ViewController, Platform, AlertController,NavController,NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormBuilder, Validators} from '@angular/forms';
import {BulletService} from '../BulletService';
import {FindPasswordPage} from './find-password/find-password';
import {RegisterPage} from './register/register';
import {UserInfo} from "../../../../model/UserInfo";
import {GlobalData} from "../../../../providers/GlobalData";
import {MinePage} from "../mine/mine";


@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
  providers: [BulletService]
})
export class PaymentPage {
  paymentForm: any;
  userinfo:UserInfo

  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private modalCtrl: ModalController,
              private platform: Platform,
              private alertCtrl: AlertController,
              private globalData: GlobalData,
              private bulletService: BulletService,
              private navCtrl: NavController,
              private navParams: NavParams) {
    this.paymentForm = this.formBuilder.group({
      tel: ['', [Validators.required, Validators.pattern('1[0-9]{10}')]],// 第一个参数是默认值
      money: ['', [Validators.required, Validators.pattern('[1-9][0-9]*')]],
    });
    this.userinfo = navParams.get('userinfo');
  }
  sentAddress(){
    this.alertCtrl.create({
      title: '再次确认',
      subTitle: '是否向该账户转账',
      buttons: [
        {
          text: '取消',
        },
        {
          text: '确定',
          handler: () => {
            var payment = this.paymentForm.value;
            var userinfo = this.userinfo;
            console.log(this.userinfo)
            console.log(payment)
            this.bulletService.Payment(userinfo.bcAddress,payment.tel,payment.money,userinfo.bcPassphrase).subscribe(res=>{
              console.log(res['result'])
              var id = res['transactionId'];
                if(!res['result']){
                  this.alertCtrl.create({
                    title: '交易发送成功',
                    subTitle: '交易非实时,交易状态请稍后确认<br/>交易号[请牢记]:<br/>'+id,
                    buttons: [
                      {
                        text: '知道了',
                      }
                    ]
                  }).present();
                }
                else{
                  this.alertCtrl.create({
                    title: '交易发送失败',
                    subTitle: '请确认手机号与交易金额并稍后重试',
                    buttons: [
                      {
                        text: '知道了',
                      }
                    ]
                  }).present();
                }
            })
          }
        }
      ]
    }).present();
  }
}
