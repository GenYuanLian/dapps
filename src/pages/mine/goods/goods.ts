/**
 * Created by Luffy on 2017/6/6.
 */
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-goods',
  templateUrl: 'goods.html'
})
export class GoodsPage {
  goodsNumber: string;
  constructor(private navCtrl: NavController,) {

  }

}


