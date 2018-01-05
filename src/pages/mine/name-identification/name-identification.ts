/**
 * Created by Luffy on 2017/6/5.
 */
import {Component} from '@angular/core';
import {FileObj} from "../../../model/FileObj";
import {NavController,NavParams,ModalController,AlertController} from "ionic-angular";
import {FileService} from "../../../providers/FileService";
import {MineService} from "../MineService";
import {FormBuilder,Validators} from "@angular/forms";
import {SetWalletPswPage} from "../set-wallet-psw/set-wallet-psw";
import {MinePage} from "../mine";
import {UserInfo} from "../../../model/UserInfo";
@Component({
  selector: 'page-name-identification',
  templateUrl: 'name-identification.html',
  providers: [MineService]
})
export class NameIdentificationPage {
  userInfo:UserInfo;
  idNumber: string;
  fileObjList: FileObj[] = [];
  idForm: any;
  isIdentify: boolean;
  inputDisabled: boolean;
  constructor(private navCtrl: NavController,
               private navParams: NavParams,
               private modalCtrl: ModalController,
               private alertCtrl: AlertController,
               private mineService: MineService,
               private formBuilder: FormBuilder) {
    this.userInfo = navParams.get('userInfo');
    this.isIdentify = false;
    this.mineService.getUserIdentification(this.userInfo.username).subscribe(res => {
      this.isIdentify = res['isIdentify'];
      this.inputDisabled = this.isIdentify;
      this.idNumber = res['idNumber'];
      if(this.idNumber!=""){
        this.idForm.value.idNumber = this.idNumber;
      }
    })
    this.idForm = this.formBuilder.group({
      idNumber: ['', [Validators.required, Validators.minLength(18)]],// 第一个参数是默认值
    });
  }
  uploadIDCard() {
    var userinfo = this.userInfo;
    console.log(this.idForm.value);
    console.log(userinfo);



        // this.alertCtrl.create({
        //   title: '实名认证成功',
        //   subTitle: '需设置钱包密码方可使用个人钱包',
        //   buttons: [
        //     {
        //       text: '前往',
        //       handler: () => {
        //         this.navCtrl.push(SetWalletPswPage,{
        //
        //         });
        //       }
        //     }
        //   ]
        // }).present();


    this.mineService.uploadIdentification(userinfo.username,this.idForm.value.idNumber).subscribe(res => {
      console.log(res);
      if(!res['success']['result']){
        this.alertCtrl.create({
          title: '实名认证失败',
          subTitle: '系统故障，请稍后再试',
          buttons: ['OK']
        }).present();
      }else {
        this.alertCtrl.create({
        title: '实名认证成功',
        subTitle: '需设置钱包密码方可使用个人钱包',
        buttons: [
       {
          text: '前往',
          handler: () => {
          this.navCtrl.push(SetWalletPswPage,{
            userInfo:userinfo
          });
          }
       }
      ]
      }).present();
      }
    });
   /* this.fileService.uploadMultiByFilePath(this.fileObjList).subscribe(res => {
      this.navCtrl.pop();
    });*/
  }
  inputChange() {
    this.inputDisabled = false;
  }
  home(){
    let modal = this.modalCtrl.create(MinePage);
    modal.present();
  }
}
