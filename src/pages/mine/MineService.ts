/**
 * Created by Luffy on 2017/6/1.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "../../providers/HttpService";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import "../../providers/Constants";
import {APP_SERVE_URL} from "../../providers/Constants";
@Injectable()
export class MineService {
  constructor(private httpService: HttpService) {
  }
  //获取用户是否实名认证
  getUserIdentification(userName):Observable<Object>{
    return this.httpService.get(APP_SERVE_URL+'user/getUserIdentification?username='+userName).map((res: Response) => res.json());
  }
  //上传用户实名认证信息
  uploadIdentification(userName,idNumber):Observable<Object>{
    return this.httpService.get(APP_SERVE_URL+'user/uploadIdentification?userName='+userName+'&idNumber='+idNumber).map((res: Response) => res.json());
  }
  //获取学校城市姓名列表
  getSchoolName():Observable<Array<Object>> {
   // return this.httpService.get('http://127.0.0.1:3000/test').map((res: Response) => res.json());
    return this.httpService.get(APP_SERVE_URL+'user/GetSchool').map((res: Response) => res.json());
  }
  //获取学校仓库得内容
  getSchoolContent(id):Observable<Array<Object>> {
    return this.httpService.get(APP_SERVE_URL+'goods/SchoolContent?schoolId='+id).map((res: Response) => res.json());
  }
  //获取学校菜单内容
  getSchoolMenu(id):Observable<Array<Object>> {
    return this.httpService.get(APP_SERVE_URL+'school/menu?schoolId='+id).map((res: Response) => res.json());
  }
  //是否领取过新人红包
  getUserBalance(username):Observable<Object>{
    return this.httpService.get(APP_SERVE_URL+'user/getUserBalance?userName='+username).map((res: Response) => res.json());
  }
  //将用户扫一扫信息传递给后台，传给一个jsonStr,返回一个插入结果，success:true or false
  insertUserScanInfo(userName,goodsNumber):Observable<Object>{
    return this.httpService.get(APP_SERVE_URL+'user/insertScanInfo?userName='+userName+'&goodsNumber='+goodsNumber).map((res: Response) => res.json());
  }
  //获取新人红包
  getNewRedPackage(userName):Observable<Object> {
    return this.httpService.get(APP_SERVE_URL+'user/getNewRedPackage?userName='+userName).map((res: Response) => res.json());
  }
}
