/**
 * Created by Luffy on 2017/7/4.
 */
/**
 * Created by Luffy on 2017/5/31.
 */
import {Component} from '@angular/core';
import {NavController,NavParams,AlertController} from 'ionic-angular';
import {MineService} from "../MineService";

@Component({
  selector: 'page-goodDetail',
  templateUrl: 'goodDetail.html',
  providers: [MineService]
})
export class GoodDetailPage {
  userName: string;
  coin:String;
  constructor(private navCtrl: NavController, private mineService: MineService, private navParams: NavParams,private alertCtrl:AlertController) {
    this.userName = navParams.get('userName');
    this.coin = '0';
  }
}


