import {Injectable} from '@angular/core';
import {Response, Headers} from "@angular/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";
import {TestObj} from "./TestObj";
import {HttpService} from "../../providers/HttpService";

@Injectable()
export class TestService {
  constructor(public httpService: HttpService) {
  }

  getJson() {
    return this.httpService.get('http://127.0.0.1:8080/hallSys/hall/getHallDetailInfo').map((res: Response) => res.json());
  }

  getObj():Observable<Object> {
    return this.httpService.get('http://127.0.0.1:3000/users/getUserByName/admin').map((res: Response) => res.json());
  }

  getList():Observable<TestObj[]> {
    return this.httpService.get('./assets/data/testList.json').map((res: Response) => res.json());
  }
  //将用户扫一扫信息传递给后台，传给一个jsonStr,返回一个插入结果，success:true or false
  insertUserScanInfo(userName,goodsNumber):Observable<Object>{
    return this.httpService.get('http://10.103.240.255:8080/user/insertScanInfo?userName='+userName+'&goodsNumber='+goodsNumber).map((res: Response) => res.json());
  }
  getIsRegister(userData):Observable<Object>{
    /*let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpService.post('http://10.103.240.255:8080/user/login', userData, header).map((res: Response) => res.json());*/
    let header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.httpService.post('http://10.103.246.116:3000/test/postUser',userData,header).map((res: Response) => res.json());
  }
}
