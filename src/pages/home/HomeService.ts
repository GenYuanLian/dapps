/**
 * Created by Luffy on 2017/5/26.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "../../providers/HttpService";
import {Observable} from "rxjs";
import {Response} from "@angular/http";
@Injectable()
export class HomeService {
  constructor(private httpService: HttpService) {
  }
  getObj():Observable<Array<Object>> {
    return this.httpService.get('http://127.0.0.1:3000/test').map((res: Response) => res.json());
  }
  getSchoolContent(id):Observable<Array<Object>> {
    return this.httpService.get('http://127.0.0.1:3000/test/getSchoolContent/'+id).map((res: Response) => res.json());
  }
}
