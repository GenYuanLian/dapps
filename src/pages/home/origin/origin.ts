/**
 * Created by Luffy on 2017/5/22.
 */
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http-service/http-service";

@Component({
  selector: 'page-origin',
  templateUrl: 'origin.html'
})
export class OriginPage {
  goodId: String;
  constructor(public navCtrl:NavController,navParams:NavParams) {
    this.goodId = navParams.get('goodId');
  }
}
