/**
 * Created by yanxiaojun on 2017/4/13.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class GlobalData {

  private _userId: string;
  private _username: string;
  private _token: string;


  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
  //登录注册部分
  private _phone:string;
  private _password:string;
  get userPhone(): string {
    return this._phone;
  }

  set userPhone(value: string) {
    this._phone = value;
  }
  get userPassword(): string {
    return this._password;
  }

  set userPassword(value: string) {
    this._password = value;
  }
}
