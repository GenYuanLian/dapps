"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Luffy on 2017/6/1.
 */
var core_1 = require("@angular/core");
var MineService = (function () {
    function MineService(httpService) {
        this.httpService = httpService;
    }
    //获取用户是否实名认证
    MineService.prototype.getUserIdentification = function (userName) {
        return this.httpService.get('http://10.103.240.171:8080/user/getUserIdentification?username=' + userName).map(function (res) { return res.json(); });
    };
    //上传用户实名认证信息
    MineService.prototype.uploadIdentification = function (userName, idNumber) {
        return this.httpService.get('http://10.103.240.171:8080/user/uploadIdentification?userName=' + userName + '&idNumber=' + idNumber).map(function (res) { return res.json(); });
    };
    //获取学校城市姓名列表
    MineService.prototype.getSchoolName = function () {
        // return this.httpService.get('http://127.0.0.1:3000/test').map((res: Response) => res.json());
        return this.httpService.get('http://10.103.240.171:8080/user/GetSchool').map(function (res) { return res.json(); });
    };
    //获取学校仓库得内容
    MineService.prototype.getSchoolContent = function (id) {
        return this.httpService.get('http://10.103.240.167:8080/goods/SchoolContent?schoolId=' + id).map(function (res) { return res.json(); });
    };
    //是否领取过新人红包
    MineService.prototype.getNewUserAward = function (username) {
        return this.httpService.get('http://127.0.0.1:3000/test/getNewUserAward/' + username).map(function (res) { return res.json(); });
    };
    //将用户扫一扫信息传递给后台，传给一个jsonStr,返回一个插入结果，success:true or false
    MineService.prototype.insertUserScanInfo = function (userName, goodsNumber) {
        return this.httpService.get('http://10.103.240.171:8080/user/insertScanInfo?userName=' + userName + '&goodsNumber=' + goodsNumber).map(function (res) { return res.json(); });
    };
    return MineService;
}());
MineService = __decorate([
    core_1.Injectable()
], MineService);
exports.MineService = MineService;
