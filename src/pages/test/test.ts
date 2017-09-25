import {Component} from '@angular/core';
import 'rxjs/add/operator/map';
import {TestService} from "./TestService";

@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  scanStr:Object;
  constructor(public testService: TestService) {

  }

  ionViewDidEnter() {

  }

  click() {
    this.scanStr = {
      userName: 'zhou',
      passWord: 'jfkdl365'
    }
   /* this.testService.insertUserScanInfo(this.scanStr['userName'],this.scanStr['goodsNumber']).subscribe(res => {
      console.log(res);
    });*/
   this.testService.getIsRegister(this.scanStr).subscribe(res => {
     console.log(res);
   })
  }

}
