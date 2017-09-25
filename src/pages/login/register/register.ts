import {Component} from '@angular/core';
import {NavController, ViewController,AlertController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginPage} from '../login';
import {LoginService} from '../LoginService';
import {UserInfo} from "../../../model/UserInfo";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [LoginService]
})
export class RegisterPage {
  userInfo:UserInfo;
  registerForm: any;

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              private loginService: LoginService) {
    this.registerForm = this.formBuilder.group({
      /*username: [, [Validators.required, Validators.pattern('[(\u4e00-\u9fa5)0-9a-zA-Z\_\s@]+')]],*/
      phone: [, [Validators.required, Validators.pattern('1[0-9]{10}')]],
      email: [, [Validators.required, Validators.email]],
      password: [, [Validators.required]]
    })
  };
  confirm() {
    var registerUser = this.registerForm.value;
    this.loginService.register(registerUser.phone,registerUser.email,registerUser.password).subscribe(res =>{
      if(!res['success']){
        this.alertCtrl.create({
          title: '注册失败',
          subTitle: res['msg'],
          buttons: ['OK']
        }).present();
      }else {
        this.alertCtrl.create({
          title: '注册成功',
          subTitle: '跳转到登录页面',
          buttons: [
            {
              text: '确定',
              handler: () => {
                this.navCtrl.push(LoginPage,{
                  phone: registerUser.phone,
                  password: registerUser.password
                });
              }
            }
          ]
        }).present();
      }
    })
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
