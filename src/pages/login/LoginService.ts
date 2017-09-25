import {Injectable} from '@angular/core';
import {HttpService} from "../../providers/HttpService";
import {Observable} from "rxjs";
import {UserInfo} from "../../model/UserInfo";
import {Response} from "@angular/http";
import {telReturn} from "../../model/telReturn";
@Injectable()
export class LoginService {
  constructor(private httpService: HttpService) {
  }

  getUser(jsonStr):Observable<UserInfo> {
    return this.httpService.get('http://10.103.240.255:8080/TrueOrFalse/Login?userInfo='+jsonStr).map((res: Response) => res.json());
  }
  getIsRegister(user):Observable<UserInfo>{
    return this.httpService.post('http://127.0.0.1:3000/users/createUser').map((res: Response) => res.json());
  }

  /**
   * 注册
   * @param phone 电话号
   * @param email 邮箱
   * @param password 密码
   * @returns {Observable<R>}
   */
  register(phone,email,password):Observable<Object>{
    return this.httpService.get('http://10.103.240.171:8080/user/register?phone='+phone+'&email='+email+'&password='+password).map((res: Response) => res.json());
  }

  /**
   * 登录
   * @param tel 电话号
   * @param psw 密码
   * @returns {Observable<R>}
   */
  login(tel,psw):Observable<Object>{
    return this.httpService.get('http://10.103.240.171:8080/user/login?tel='+tel+"&password="+psw).map((res: Response) => res.json());
  }
  findPassword(idNumber):Observable<Object>{
    return this.httpService.get('http://10.103.240.171:8080/user/findPassword?idNumber='+idNumber).map((res: Response) => res.json());
  }
 /* login(tel,password):Observable<UserInfo> {
    return Observable.create((observer) => {
      /!*var userInfo;
      userInfo = {
        id: 1,
        username: 'Luffy',
        name: '902实验室',
        email: '439923999@qq.com',
        phone: '13388888888',
        avatarId: '',
        description: 'bupt902程序员一枚',
        identification: true
      };*!/
      /!*this.getUser(user.name).subscribe(res => {
       if(res!=null){
          console.log("登陆成功");
          userInfo = {
            id: 1,
            username: res['name'],
            name: '902实验室',
            email: res['email'],
            phone: '13388888888',
            avatarId: '',
            description: 'bupt902程序员一枚',
            identification: true
          };
        }else {
          userInfo = {
            id: 1,
            username: '',
            name: '',
            email: '',
            phone: '',
            avatarId: '',
            description: '',
            identification: false
          };
        }
        observer.next(userInfo);
      });*!/
      observer.next(userInfo);
    });
  }*/
}
