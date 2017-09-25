"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Luffy on 2017/5/31.
 */
var core_1 = require("@angular/core");
var MineService_1 = require("../MineService");
var name_identification_1 = require("../name-identification/name-identification");
var BulletPage = (function () {
    function BulletPage(navCtrl, mineService, navParams, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.mineService = mineService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.username = navParams.get('userName');
        this.mineService.getUserIdentification(this.username).subscribe(function (res) {
            console.log(res);
            if (!res['isIdentify']) {
                _this.alertCtrl.create({
                    title: '未实名认证',
                    subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
                    buttons: [{ text: '取消' },
                        {
                            text: '确定',
                            handler: function () {
                                navCtrl.push(name_identification_1.NameIdentificationPage);
                            }
                        }
                    ]
                }).present();
            }
            else {
                console.log("已经是实名认证用户");
                _this.mineService.getNewUserAward(_this.username).subscribe(function (res) {
                    if (!res['isAward']) {
                        _this.alertCtrl.create({
                            title: '新人红包',
                            subTitle: '恭喜您获得新人红包',
                            buttons: ['确定']
                        }).present();
                    }
                    else {
                        console.log("已领取过新人红包");
                    }
                });
            }
        });
    }
    BulletPage.prototype.redPacket = function () {
        this.alertCtrl.create({
            title: '二期开发',
            subTitle: '正在开发，敬请期待',
            buttons: ['确定']
        }).present();
    };
    BulletPage.prototype.coinMarket = function () {
        this.alertCtrl.create({
            title: '二期开发',
            subTitle: '正在开发，敬请期待',
            buttons: ['确定']
        }).present();
    };
    return BulletPage;
}());
BulletPage = __decorate([
    core_1.Component({
        selector: 'page-bullet',
        templateUrl: 'bullet.html',
        providers: [MineService_1.MineService]
    })
], BulletPage);
exports.BulletPage = BulletPage;
