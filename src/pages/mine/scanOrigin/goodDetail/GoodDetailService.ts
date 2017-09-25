/**
 * Created by Luffy on 2017/6/1.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "../../../../providers/HttpService";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {APP_SERVE_URL} from "../../../../providers/Constants";

@Injectable()
export class GoodDetailService {
  constructor(private httpService: HttpService) {
  }
  getGoodsDetail(goodsnumber):Observable<Array<Array<Object>>>{
    return this.httpService.get(APP_SERVE_URL+'goods/GoodsDetail?goodsnumber='+goodsnumber).map((res: Response) => res.json());
  }
}
