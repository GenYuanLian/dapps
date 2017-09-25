/**
 * Created by Luffy on 2017/5/31.
 */
import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";

@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html'
})
export class CollectPage {
  userName: string;
  constructor(private navCtrl: NavController, private nativeService: NativeService, private navParams: NavParams) {
    this.userName = navParams.get('userName');
  }

}


