/**
 * Created by Luffy on 2017/6/14.
 */
import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {MineService} from "../MineService";
import {DEFAULT_FOODBG} from "../../../providers/Constants";

@Component({
  selector: 'page-school-menu',
  templateUrl: 'school-menu.html',
  providers: [MineService]
})
export class SchoolMenuPage {
  menuArr = [];
  schoolId: String;
  foodbg:string = DEFAULT_FOODBG;
  constructor(private navCtrl: NavController,
              private mineService: MineService,
              private navParams: NavParams) {
    this.schoolId = this.navParams.get('schoolId');
    this.mineService.getSchoolMenu(this.schoolId).subscribe(res => {
      this.menuArr = res;
      console.log(this.menuArr);
    });
  }
}


