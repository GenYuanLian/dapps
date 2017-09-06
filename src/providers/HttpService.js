"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Utils_1 = require("./Utils");
var HttpService = HttpService_1 = (function () {
    function HttpService(http, globalData) {
        this.http = http;
        this.globalData = globalData;
    }
    HttpService.prototype.get = function (url, paramMap) {
        return this.http.get(url, new http_1.RequestOptions({
            search: HttpService_1.buildURLSearchParams(paramMap),
        }));
    };
    // 默认Content-Type为application/json;
    HttpService.prototype.post = function (url, body, options) {
        if (body === void 0) { body = null; }
        return this.http.post(url, body, this.getOptions(options));
    };
    HttpService.prototype.postFormData = function (url, paramMap) {
        var headers = new http_1.Headers({
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json;charset=utf-8',
            'token': this.globalData.token
        });
        return this.http.post(url, HttpService_1.buildURLSearchParams(paramMap).toString(), new http_1.RequestOptions({ headers: headers }));
    };
    HttpService.prototype.put = function (url, body, options) {
        if (body === void 0) { body = null; }
        return this.http.put(url, body, this.getOptions(options));
    };
    HttpService.prototype.delete = function (url, paramMap) {
        return this.http.delete(url, new http_1.RequestOptions({
            search: HttpService_1.buildURLSearchParams(paramMap),
            headers: new http_1.Headers({
                'token': this.globalData.token
            })
        }));
    };
    HttpService.prototype.patch = function (url, body, options) {
        if (body === void 0) { body = null; }
        return this.http.patch(url, body, this.getOptions(options));
    };
    HttpService.prototype.head = function (url, paramMap) {
        return this.http.head(url, new http_1.RequestOptions({
            search: HttpService_1.buildURLSearchParams(paramMap),
            headers: new http_1.Headers({
                'token': this.globalData.token
            })
        }));
    };
    HttpService.prototype.options = function (url, paramMap) {
        return this.http.options(url, new http_1.RequestOptions({
            search: HttpService_1.buildURLSearchParams(paramMap),
            headers: new http_1.Headers({
                'token': this.globalData.token
            })
        }));
    };
    HttpService.buildURLSearchParams = function (paramMap) {
        var params = new http_1.URLSearchParams();
        if (!paramMap) {
            return params;
        }
        for (var key in paramMap) {
            var val = paramMap[key];
            if (val instanceof Date) {
                val = Utils_1.Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss');
            }
            params.set(key, val);
        }
        return params;
    };
    HttpService.prototype.getOptions = function (options) {
        if (!options) {
            options = new http_1.RequestOptions({
                headers: new http_1.Headers({
                    'token': this.globalData.token
                })
            });
            return options;
        }
    };
    return HttpService;
}());
HttpService = HttpService_1 = __decorate([
    core_1.Injectable()
], HttpService);
exports.HttpService = HttpService;
var HttpService_1;
