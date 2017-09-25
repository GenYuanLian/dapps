"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var TestService = (function () {
    function TestService(httpService) {
        this.httpService = httpService;
    }
    TestService.prototype.getJson = function () {
        return this.httpService.get('http://127.0.0.1:8080/hallSys/hall/getHallDetailInfo').map(function (res) { return res.json(); });
    };
    TestService.prototype.getObj = function () {
        return this.httpService.get('http://127.0.0.1:3000/users/getUserByName/admin').map(function (res) { return res.json(); });
    };
    TestService.prototype.getList = function () {
        return this.httpService.get('./assets/data/testList.json').map(function (res) { return res.json(); });
    };
    //将用户扫一扫信息传递给后台，传给一个jsonStr,返回一个插入结果，success:true or false
    TestService.prototype.insertUserScanInfo = function (userName, goodsNumber) {
        return this.httpService.get('http://10.103.240.255:8080/user/insertScanInfo?userName=' + userName + '&goodsNumber=' + goodsNumber).map(function (res) { return res.json(); });
    };
    TestService.prototype.getIsRegister = function (userData) {
        /*let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.httpService.post('http://10.103.240.255:8080/user/login', userData, header).map((res: Response) => res.json());*/
        var header = new http_1.Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.httpService.post('http://10.103.246.116:3000/test/postUser', userData, header).map(function (res) { return res.json(); });
    };
    return TestService;
}());
TestService = __decorate([
    core_1.Injectable()
], TestService);
exports.TestService = TestService;
