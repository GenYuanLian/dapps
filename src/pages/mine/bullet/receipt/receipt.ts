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
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
  providers: [BulletService]
})
export class ReceiptPage {
  receiptForm: any;
  userinfo:UserInfo;

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
    this.userinfo=navParams.get('userinfo');
    this.receiptForm = this.formBuilder.group({
      tel: ['', [Validators.required, Validators.minLength(4)]],// 第一个参数是默认值
    });
  }
  sentAddress(){
    var receipt = this.receiptForm.value;
    var userinfo = this.userinfo;
    this.bulletService.Receipt(receipt.tel,userinfo.bcAddress).subscribe(res=>{
      console.log(res['result'])
      if(res['result']){
        this.alertCtrl.create({
          title: '收款成功',
          subTitle: '获得的根源币已存入钱包中',
          buttons: [
            {
              text: '知道了',
            }
          ]
        }).present();
      }
      else{
        this.alertCtrl.create({
          title: '收款失败',
          subTitle: '可能情况如下:<br/>1.输入手机号错误<br/>2.该笔交易尚未被确认',
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
