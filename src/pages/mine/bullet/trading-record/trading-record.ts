/**
 * Created by Gjp on 2017/9/20.
 */
import {Component} from '@angular/core';
import {ModalController, ViewController, Platform, AlertController,NavController,NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormBuilder} from '@angular/forms';
import {BulletService} from '../BulletService';
import {FindPasswordPage} from './find-password/find-password';
import {RegisterPage} from './register/register';
import {UserInfo} from "../../../../model/UserInfo";
import {GlobalData} from "../../../../providers/GlobalData";
import {MinePage} from "../mine/mine";
import {TradingMes} from "../../../../model/TradingMes";
import {TransactionDetailsPage} from "../transaction-details/transaction-details";



@Component({
  selector: 'page-trading-record',
  templateUrl: 'trading-record.html',
  providers: [BulletService]
})
export class TradingRecordPage {
  userInfo:UserInfo;
  TradingMesList:any[]=[
  ];
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
    this.userInfo = navParams.get("userinfo");
    this.bulletService.TransactionRecord(this.userInfo.bcAddress).subscribe(res=>{
      console.log(res);
      if(res["result"]){
        var size = res["size"];
        for(var i=0;i<size;i++){
          var from = res["from"+i];
          var to = res["to"+i];
          var value = res["value"+i];
          var time = res["time"+i];
          this.TradingMesList.push(new TradingMes(from,to,value,time));
        }
        console.log(this.TradingMesList)
      }
    })
  }
  itemClick(event,item:TradingMes){
    let modal = this.modalCtrl.create(TransactionDetailsPage,{item:item});
    modal.present();
  }
}
