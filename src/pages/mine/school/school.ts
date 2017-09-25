/**
 * Created by Luffy on 2017/6/1.
 */
import {Component} from '@angular/core';
import {NavController,NavParams,AlertController} from 'ionic-angular';
import {MineService} from "../MineService";
import {NameIdentificationPage} from "../name-identification/name-identification";
import {SchoolMenuPage} from "../school-menu/school-menu";
import {SchoolCollectionPage} from "../school-collection/school-collection";

@Component({
  selector: 'page-school',
  templateUrl: 'school.html',
  providers:[MineService]
})
export class SchoolPage {
  userName:String;
  select: String;
  schoolName = [];
  schoolArr = [];
  constructor(private navCtrl: NavController, private mineService: MineService, private navParams: NavParams,private alertCtrl: AlertController) {
    this.userName = navParams.get("userName");
    this.mineService.getSchoolName().subscribe(res => {
      this.schoolName = res;
    });
    this.mineService.getUserIdentification(this.userName).subscribe(res => {
      console.log(res);
      if(!res['isIdentify']){
        this.alertCtrl.create({
          title: '未实名认证',
          subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
          buttons: [{text: '取消'},
            {
              text: '确定',
              handler: () => {
                navCtrl.push(NameIdentificationPage,{
                  userName: this.userName
                });
              }
            }
          ]
        }).present();
      }else {
        console.log("已经是实名认证用户");
      }
    });
  }
  getSelectedSchool() {
    if (this.select) {
      this.schoolArr = []; //清空数组，否则会叠加
      this.mineService.getSchoolContent(this.select).subscribe(res => {
        var data = res;
        for (let i = 0; i < data.length; i++) {
          this.schoolArr.push(data[i]);
        }
      })
    }
  }
  goToCollection() {
    if(!this.select){
     this.alertCtrl.create({
        title: '未关联学校',
        subTitle: '请关联学校之后再查看学校食采情况',
        buttons: ['知道了']
      }).present();
    }else {
      this.navCtrl.push(SchoolCollectionPage,{
        schoolArr: this.schoolArr
      })
    }
  }
  goToMenu() {
    if(!this.select){
      this.alertCtrl.create({
        title: '未关联学校',
        subTitle: '请关联学校之后再查看学校阳光菜单',
        buttons: ['知道了']
      }).present();
    }else {
      this.navCtrl.push(SchoolMenuPage,{
        schoolId: this.select
      })
    }
  }
}
