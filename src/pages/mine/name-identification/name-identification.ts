/**
 * Created by Luffy on 2017/6/5.
 */
import {Component} from '@angular/core';
import {FileObj} from "../../../model/FileObj";
import {NavController,NavParams,AlertController} from "ionic-angular";
import {FileService} from "../../../providers/FileService";
import {MineService} from "../MineService";
import {FormBuilder,Validators} from "@angular/forms";
@Component({
  selector: 'page-name-identification',
  templateUrl: 'name-identification.html',
  providers: [MineService]
})
export class NameIdentificationPage {
  userName:String;
  idNumber: string;
  fileObjList: FileObj[] = [];
  idForm: any;
  isIdentify: boolean;
  inputDisabled: boolean;
  constructor(private navCtrl: NavController,private navParams: NavParams, private alertCtrl: AlertController,private mineService: MineService,private formBuilder: FormBuilder) {
    this.userName = navParams.get('userName');
    this.isIdentify = false;
    this.mineService.getUserIdentification(this.userName).subscribe(res => {
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
    console.log(this.idForm.value);
    this.mineService.uploadIdentification(this.userName,this.idForm.value.idNumber).subscribe(res => {
      console.log(res);
      if(!res['success']['result']){
        this.alertCtrl.create({
          title: '实名认证失败',
          subTitle: '系统故障，请稍后再试',
          buttons: ['OK']
        }).present();
      }else {
        this.alertCtrl.create({
          title: '注册成功',
          subTitle: '您的根源链钱包地址为:'+res['success']['bcAddress'],
          buttons: [{
            text:'知道了',
            handler: () => {
              this.navCtrl.pop();
            }
          }]
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
}
