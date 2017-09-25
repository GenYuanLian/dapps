/**
 * Created by Luffy on 2017/6/13.
 */
import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";

@Component({
  selector: 'page-account-safe',
  templateUrl: 'account-safe.html'
})
export class AccountSafePage {
  userName: string;
  constructor(private navCtrl: NavController, private nativeService: NativeService, private navParams: NavParams) {
    this.userName = navParams.get('userName');
  }
}
