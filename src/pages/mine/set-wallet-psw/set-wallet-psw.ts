/**
 * Created by 902 on 2017/9/11.
 */
import {Component} from '@angular/core';
import {FileObj} from "../../../model/FileObj";
import {NavController,NavParams,AlertController,ModalController} from "ionic-angular";
import {FileService} from "../../../providers/FileService";
import {MineService} from "../MineService";
import {FormBuilder,Validators} from "@angular/forms";
import {BulletPage} from "../bullet/bullet";
import {UserInfo} from "../../../model/UserInfo";
@Component({
  selector: 'page-set-wallet-psw',
  templateUrl: 'set-wallet-psw.html',
  providers: [MineService]
})
export class SetWalletPswPage {
  walletpasswordForm:any;
  userinfo:UserInfo;

  constructor(private navCtrl: NavController,
               private navParams: NavParams,
               private alertCtrl: AlertController,
               private modalCtrl: ModalController,
               private mineService: MineService,
               private formBuilder: FormBuilder) {
    this.walletpasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],// 第一个参数是默认值
      repassword: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.userinfo = navParams.get('userInfo');

  }

  setpassword(){
    console.log(this.userinfo)
    console.log(this.walletpasswordForm.value.password)
    this.mineService.setUserWalletPassword(this.userinfo.username,this.walletpasswordForm.value.password).subscribe(res => {
      if(res['success']['result']){//后台返回值
        console.log(res['success']['bcPassphrase'])
        console.log(res['success']['bcAddress'])
        this.alertCtrl.create({
          title: '密码设置成功',
          subTitle: '查看数字钱包信息',
          buttons: [
            {
              text: '前往',
              handler: () => {
                this.userinfo.bcAddress=res['success']['bcAddress'];
                this.userinfo.bcPassphrase=this.walletpasswordForm.value.password;
                this.navCtrl.push(BulletPage,{
                  userInfo:this.userinfo
                });
              }
            }
          ]
        }).present();
      }else {
        this.alertCtrl.create({
          title: '密码设置失败',
          subTitle: '请稍后重试',
          buttons: [
            {
              text: '确定',
            }
          ]
        }).present();
      }
    });
  }
}
