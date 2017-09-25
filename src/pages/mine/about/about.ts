import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";
import {UpdateLogPage} from "../update-log/update-log";
import {FeedBackPage} from "../feed-back/feed-back";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  versionNo: string = '1.0.0';
  constructor(private navCtrl: NavController,
              private nativeService: NativeService,
              private alertCtrl: AlertController) {
    if (this.nativeService.isMobile()) {
      this.nativeService.getVersionNumber().then(value => {
        this.versionNo = value;
      });
    }
  }

  checkNewVersion() {
    this.nativeService.detectionUpgrade();
  }

  updateLog() {
    this.navCtrl.push(UpdateLogPage);
  }

  features() {
    this.alertCtrl.create({
      title: '功能介绍',
      subTitle: '1.个人中心<br/>2.根源票系统<br/>3.溯源足迹<br/>4.校园仓库查询<br/>5.商品扫一扫',
      buttons: ['知道了']
    }).present();
  }

  feedBack() {
    this.navCtrl.push(FeedBackPage);
  }

}


