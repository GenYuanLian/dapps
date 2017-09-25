import {Component} from '@angular/core';
import {NavController, ViewController, AlertController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginPage} from '../login';
import {LoginService} from "../LoginService";

@Component({
  selector: 'page-find-password',
  templateUrl: 'find-password.html',
  providers: [LoginService]
})
export class FindPasswordPage {
  findPasswordForm: any;
  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private loginService: LoginService,
              private alertCtrl: AlertController) {
    this.findPasswordForm = this.formBuilder.group({
      idNumber: [, [Validators.required, Validators.minLength(18)]]
     /* phone: [, [Validators.required, Validators.minLength(11), Validators.pattern('1[0-9]{10}')]],
      verificationCode: [, [Validators.required, Validators.minLength(6), Validators.pattern('[0-9]{6}')]],
      newPassword: [, [Validators.required, Validators.minLength(6)]]*/
    });
  };
  confirm() {
    //this.navCtrl.setRoot(LoginPage)
    this.loginService.findPassword(this.findPasswordForm.value.idNumber).subscribe(res => {
      if(res['success']){
        this.alertCtrl.create({
          title: '验证成功',
          subTitle: '请记住您的密码:'+res['password'],
          buttons: [{
            text: '确定',
            handler: () => {
              this.navCtrl.push(LoginPage);
            }
          }]
        }).present();
      }else {
        this.alertCtrl.create({
          title: '验证失败',
          subTitle: '未找到匹配信息，或者未实名认证',
          buttons: ['OK']
        }).present();
      }
    });
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
