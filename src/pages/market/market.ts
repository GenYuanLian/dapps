/**
 * Created by Luffy on 2017/5/31.
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpService} from "../../providers/http-service/http-service";
import {NativeService} from "../../providers/NativeService";

@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
})
export class MarketPage {
  constructor(public navCtrl: NavController,public nativeService:NativeService,) {

  }
}
