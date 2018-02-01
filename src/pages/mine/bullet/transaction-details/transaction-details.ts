/**
 * Created by Gjp on 2017/9/20.
 */
import {Component} from '@angular/core';
import {ModalController, ViewController, Platform, AlertController,NavController,NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormBuilder, Validators} from '@angular/forms';
import {BulletService} from '../BulletService';
import {FindPasswordPage} from './find-password/find-password';
import {RegisterPage} from './register/register';
import {UserInfo} from "../../model/UserInfo";
import {GlobalData} from "../../../../providers/GlobalData";
import {MinePage} from "../mine/mine";
import {TradingMes} from "../../../../model/TradingMes";



@Component({
  selector: 'page-transaction-details',
  templateUrl: 'transaction-details.html',
  providers: [BulletService]
})
export class TransactionDetailsPage {
  tradingmes:TradingMes;
  userName:string;

  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private modalCtrl: ModalController,
              private platform: Platform,
              public params: NavParams,
              private alertCtrl: AlertController,
              private globalData: GlobalData,
              private bulletService: BulletService,
              private navCtrl: NavController,
              private navParams: NavParams,) {
    this.userName=navParams.get('userName');
    this.tradingmes=navParams.data.item;
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}
