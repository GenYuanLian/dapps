/**
 * Created by yanxiaojun617@163.com on 2-25.
 */
import {Events} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {NativeService} from "./NativeService";

@Injectable()
export class HttpInterceptHandle {
  constructor(public events: Events, public nativeService: NativeService) {
    events.subscribe('request:before', (url, options) => {
      nativeService.showLoading();
      console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
    });

    events.subscribe('request:success', (url, options, res) => {
      nativeService.hideLoading();
      console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
    });

    events.subscribe('request:error', (url, options, error) => {
      nativeService.hideLoading();
      console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'error', error);
      let status = error.status;
      if (status === 0) {
        nativeService.showToast('请求响应错误，请检查网络');
      } else if (status === 404) {
        nativeService.showToast('请求链接不存在，请联系管理员');
      } else if (status === 500) {
        nativeService.showToast('服务器出错，请稍后再试');
      } else {
        nativeService.showToast('未知错误，请检查网络');
      }
    });
  }

}
