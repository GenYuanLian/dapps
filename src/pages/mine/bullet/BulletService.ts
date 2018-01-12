/**
 * Created by Gjp on 2017/9/19.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "../../../providers/HttpService";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
import {telReturn} from "../../model/telReturn";
import {APP_SERVE_URL} from "../../../providers/Constants";
import {TradingMes} from "../../../model/TradingMes";
@Injectable()
export class BulletService {
  constructor(private httpService: HttpService) {
  }

  Payment(payer,payee,number,bcPassphrase):Observable<Object>{
    return this.httpService.get(APP_SERVE_URL +'user/payment?payer='+payer+'&payee='+payee+'&value='+number+'&bcPassphrase='+bcPassphrase).map((res: Response) => res.json());
  }

  Receipt(payer,payee):Observable<Object>{
    return this.httpService.get(APP_SERVE_URL +'user/receipt?payer='+payer+'&payee='+payee).map((res: Response) => res.json());
  }

  TransactionQuery(number):Observable<Object>{
    return this.httpService.get(APP_SERVE_URL +'user/transactionquery?Txnumber='+number).map((res: Response) => res.json());
  }

  TransactionRecord(username):Observable<Array<TradingMes>>{
    return this.httpService.get(APP_SERVE_URL +'user/transactionrecord?username='+username).map((res: Response) => res.json());
  }

}
