/**
 * Created by Luffy on 2017/5/31.
 */
import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {NativeService} from "../../../providers/NativeService";
import {ScanOriginService} from "./ScanOriginService";
import {GoodDetailPage} from "./goodDetail/goodDetail";


@Component({
  selector: 'page-scanOrigin',
  templateUrl: 'scanOrigin.html',
  providers:[ScanOriginService]
})
export class ScanOriginPage {
  userName: string;
  goodList= [];
  constructor(private navCtrl: NavController, private scanOriginService: ScanOriginService, private navParams: NavParams) {
    this.userName = navParams.get("userName");
    console.log(this.userName+"1111");
    this.scanOriginService.getGoodsList(13521365896).subscribe(res => {
      this.goodList = [];
      var data = res;
      console.log(data);
      for(let i=0;i<data.length;i++){
        console.log(data[i]['success']);
        if(data[i]['success']=="true"){
          this.goodList.push(data[i]);
          console.log(this.goodList[i]+"333333");
        }
      }
    });
  }
  goodDetail(goodsNumber,Name,bathNote,Warrant,ProductionDate,ProductDes,ProductStatus) {
      this.navCtrl.push(GoodDetailPage,{
        goodsNumber:goodsNumber,
        Name:Name,
        bathNote:bathNote,
        Warrant:Warrant,
        ProductionDate:ProductionDate,
        ProductDes:ProductDes,
        ProductStatus:ProductStatus
      });
  }

}


