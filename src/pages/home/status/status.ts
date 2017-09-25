/**
 * Created by Luffy on 2017/5/25.
 */
import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import {HttpService} from "../../../providers/http-service/http-service";

@Component({
  selector: 'page-status',
  templateUrl: 'status.html'
})
export class StatusPage {
  goodId: String;
  constructor(public navCtrl:NavController,navParams:NavParams) {
    this.goodId = navParams.get('goodId');
  }
}
