import {Component} from '@angular/core';
import {ModalController, ViewController, Platform, AlertController,NavController,NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormBuilder, Validators} from '@angular/forms';

import {LoginService} from './LoginService';

import {FindPasswordPage} from './find-password/find-password';
import {RegisterPage} from './register/register';
import {UserInfo} from "../../model/UserInfo";
import {GlobalData} from "../../providers/GlobalData";
import {MinePage} from "../mine/mine";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class LoginPage {
  userInfo: UserInfo;
  submitted: boolean = false;
  canLeave: boolean = false;
  loginForm: any;

  constructor(private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private storage: Storage,
              private modalCtrl: ModalController,
              private platform: Platform,
              private alertCtrl: AlertController,
              private globalData: GlobalData,
              private loginService: LoginService,
              private navCtrl: NavController,
              private navParams: NavParams) {
    if(navParams.get('phone')) {
      this.loginForm = this.formBuilder.group({
        username: [navParams.get('phone'), [Validators.required, Validators.minLength(4)]],// 第一个参数是默认值
        password: ['', [Validators.required, Validators.minLength(4)]]
      });
    }else {
      this.loginForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(4)]],// 第一个参数是默认值
        password: ['', [Validators.required, Validators.minLength(4)]]
      });
    }
  }
  ionViewWillEnter() {
    this.storage.get('UserInfo').then(userInfo => {
      this.userInfo = userInfo || null;
    });
  }
  ionViewCanLeave(): boolean {
    let bool = !!this.userInfo;
    if (this.canLeave || bool) {
      return true;
    } else {
      this.alertCtrl.create({
        title: '确认退出软件？',
        buttons: [{text: '取消'},
          {
            text: '确定',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      }).present();
      return false;
    }
  }
  login() {
    this.submitted = true;
    this.loginService.login(this.loginForm.value.username,this.loginForm.value.password)
      .subscribe((userInfo: UserInfo) => {
        if(userInfo['result']){
          this.submitted = false;
          //userInfo.token = 'trueOrFalse';//从后台获取token,暂时写死
          this.globalData.userId =userInfo.id;
          this.globalData.username =userInfo.username;
         // this.globalData.token =userInfo.token;
          this.userInfo = userInfo;
          this.storage.set('UserInfo', userInfo);
          //this.viewCtrl.dismiss(userInfo);
          this.navCtrl.push(MinePage);
        }else {
          this.alertCtrl.create({
            title: '登录失败',
            subTitle: '用户名或密码错误,请重新输入',
            buttons: ['OK']
          }).present();
          this.submitted = false;
        }
      });
  }
  toRegister() {
    this.canLeave = true;
    let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
    //this.canLeave = false;
  }
  findPassword() {
    this.canLeave = true;
    let modal = this.modalCtrl.create(FindPasswordPage);
    modal.present();
    //this.canLeave = false;
  }

}
