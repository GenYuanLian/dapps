/**
 * Created by Luffy on 2017/6/15.
 */
import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";
import {GoodDetailPage} from "../scanOrigin/goodDetail/goodDetail";

@Component({
  selector: 'page-school-collection',
  templateUrl: 'school-collection.html'
})
export class SchoolCollectionPage {
  schoolArr = [];
  constructor(private navCtrl: NavController,
              private nativeService: NativeService,
              private navParams: NavParams) {
      this.schoolArr = navParams.get('schoolArr');
  }
  showDetail(goodsId) {
    this.navCtrl.push(GoodDetailPage,{
      goodsId: goodsId
    });
  }
}


