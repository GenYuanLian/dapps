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
  selector: 'page-query-transaction',
  templateUrl: 'query-transaction.html',
  providers: [BulletService]
})
export class QueryTransactionPage {
  querytransactionForm: any;
  userInfo:UserInfo;

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
    this.userInfo=navParams.get('userInfo');
    this.querytransactionForm = this.formBuilder.group({
      querynumber: ['', [Validators.required, Validators.minLength(64)]],// 第一个参数是默认值
    });
  }
  sentNumber(){
    var querynumber = this.querytransactionForm.value;
    console.log(querynumber)
    this.bulletService.TransactionQuery(querynumber.querynumber).subscribe(res=>{
      console.log(res['result'])
      console.log(res[''])
      if(res['result']){
        this.alertCtrl.create({
          title: '交易状态:成功',
          subTitle: '该笔交易已被系统确认',
          buttons: [
            {
              text: '知道了',
            }
          ]
        }).present();
      }
      else{
        this.alertCtrl.create({
          title: '交易状态:未处理',
          subTitle: '该交易号对应的交易尚未被系统确认<br/>请确认交易号准确无误',
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
