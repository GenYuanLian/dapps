import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BarcodeScanner} from '@ionic-native/barcode-scanner';
import {Platform, NavController, ModalController, AlertController} from 'ionic-angular';
import {MineEditPage} from './mine-edit/mine-edit';
import {MineEditAvatarModalPage} from './mine-edit-avatar-modal/mine-edit-avatar-modal';
import {UserInfo} from "../../model/UserInfo";
import {DEFAULT_AVATAR} from "../../providers/Constants";
import {NativeService} from "../../providers/NativeService";
import {LoginPage} from "../login/login";
import {SetPage} from "./setting/setting";
import {CollectPage} from "./collect/collect";
import {ScanOriginPage} from "./scanOrigin/scanOrigin";
import {BulletPage} from "./bullet/bullet";
import {SchoolPage} from "./school/school";
import {MineService} from "./MineService";
import {GoodDetailPage} from "./scanOrigin/goodDetail/goodDetail";

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
  providers: [MineService]
})
export class MinePage {
  scanedText: String;
  userInfo: UserInfo;
  scanObj: Object;
  avatarPath: string = DEFAULT_AVATAR;

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private storage: Storage,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private nativeService: NativeService,
              private barcodeScanner:BarcodeScanner,
              private mineService: MineService) {
    this.storage.get('UserInfo').then((userInfo: UserInfo) => {
      if (userInfo) {
        this.userInfo = userInfo;
        userInfo.avatar && (this.avatarPath = userInfo.avatar);
      }else {
        this.userInfo = {
          id: '',
          username: '',
          name: '真否用户',
          email: '',
          phone: '',
          avatar: '',
          description: '',
          token: '',
          password: '',
          bcAddress: '',
          identification:false
        }
      }
    });
  }
  edit() {
    this.navCtrl.push(MineEditPage, {'userInfo': this.userInfo, 'avatarPath': this.avatarPath});
  }
  viewAvatar($event) {
    $event.stopPropagation();
    let modal = this.modalCtrl.create(MineEditAvatarModalPage, {
      'userInfo': this.userInfo,
      'avatarPath': this.avatarPath
    });
    modal.present();
    modal.onDidDismiss(data => {
      data && (this.avatarPath = data.avatarPath)
    });
  }
  loginOut() {
    this.alertCtrl.create({
      title: '确认重新登录？',
      buttons: [{text: '取消'},
        {
          text: '确定',
          handler: () => {
            this.storage.clear();
            let modal = this.modalCtrl.create(LoginPage);
            modal.present();
            modal.onDidDismiss(userInfo => {
              if (userInfo) {
                this.userInfo = userInfo;
                userInfo.avatar && (this.avatarPath = userInfo.avatar);
              }
            });
          }
        }
      ]
    }).present();
  }
  exitSoftware() {
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
  }
  collect() {
    this.navCtrl.push(CollectPage,{
      userName: this.userInfo.username
    });
  /*  this.alertCtrl.create({
      title: '二期开发',
      subTitle: '该功能正在完善，敬请期待！',
      buttons: ['OK']
    }).present();*/
  }
  card() {
    this.navCtrl.push(BulletPage,{
      userName: this.userInfo.username
    });
    /*this.alertCtrl.create({
      title: '二期开发',
      subTitle: '该功能正在完善，敬请期待！',
      buttons: ['OK']
    }).present();*/
  }
  school() {
    this.navCtrl.push(SchoolPage,{
      userName: this.userInfo.username
    });
  }
  setting() {
    this.navCtrl.push(SetPage,{
      userName: this.userInfo.username
    });
  }
  scanQR() {
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        console.log("User cancelled the action!");
        return false;
      }
      console.log("Scanned successfully!");
      console.log(barcodeData);
      this.scanedText = barcodeData.text;
      this.scanObj = {
        userName: this.userInfo.username,
        goodsNumber: this.scanedText
      }
      this.mineService.insertUserScanInfo(this.scanObj['userName'],this.scanObj['goodsNumber']).subscribe(res => {
        if(res){//扫描成功，进入商品页
          this.navCtrl.push(GoodDetailPage,{
            goodsNumber: this.scanedText
          });
        }else {//扫描失败，弹窗提示
          this.alertCtrl.create({
            title: '上传失败',
            subTitle: '扫一扫数据上传失败,请重新扫描上传！',
            buttons: ['好']
          }).present();
        }
      })
    }, (err) => {
      console.log(err);
      return err;
    });
  }
  scanOrigin() {
    this.navCtrl.push(ScanOriginPage,{
      userName: this.userInfo.username
    });
  }
}
