/**
 * Created by Luffy on 2017/5/22.
 */
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http-service/http-service";
import {OriginPage} from  "../origin/origin";
import {StatusPage} from "../status/status";

@Component({
  selector: 'page-good',
  templateUrl: 'good.html'
})
export class GoodPage {
  goodId: String;
  goodName: String;
  constructor(public navCtrl:NavController,navParams:NavParams) {
    this.goodId = navParams.get('goodId');
  }
  toOrigin() {
    this.navCtrl.push(OriginPage,{
      goodId:this.goodId
    });
  }
  toStatus() {
    this.navCtrl.push(StatusPage,{
      goodId:this.goodId
    });
  }
}
