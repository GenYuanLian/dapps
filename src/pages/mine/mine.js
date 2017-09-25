"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mine_edit_1 = require("./mine-edit/mine-edit");
var mine_edit_avatar_modal_1 = require("./mine-edit-avatar-modal/mine-edit-avatar-modal");
var Constants_1 = require("../../providers/Constants");
var login_1 = require("../login/login");
var setting_1 = require("./setting/setting");
var collect_1 = require("./collect/collect");
var scanOrigin_1 = require("./scanOrigin/scanOrigin");
var bullet_1 = require("./bullet/bullet");
var school_1 = require("./school/school");
var MineService_1 = require("./MineService");
var MinePage = (function () {
    function MinePage(navCtrl, platform, storage, modalCtrl, alertCtrl, nativeService, barcodeScanner, mineService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.nativeService = nativeService;
        this.barcodeScanner = barcodeScanner;
        this.mineService = mineService;
        this.avatarPath = Constants_1.DEFAULT_AVATAR;
        this.storage.get('UserInfo').then(function (userInfo) {
            if (userInfo) {
                _this.userInfo = userInfo;
                userInfo.avatar && (_this.avatarPath = userInfo.avatar);
            }
        });
    }
    MinePage.prototype.edit = function () {
        this.navCtrl.push(mine_edit_1.MineEditPage, { 'userInfo': this.userInfo, 'avatarPath': this.avatarPath });
    };
    MinePage.prototype.viewAvatar = function ($event) {
        var _this = this;
        $event.stopPropagation();
        var modal = this.modalCtrl.create(mine_edit_avatar_modal_1.MineEditAvatarModalPage, {
            'userInfo': this.userInfo,
            'avatarPath': this.avatarPath
        });
        modal.present();
        modal.onDidDismiss(function (data) {
            data && (_this.avatarPath = data.avatarPath);
        });
    };
    MinePage.prototype.loginOut = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '确认重新登录？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        var modal = _this.modalCtrl.create(login_1.LoginPage);
                        modal.present();
                        modal.onDidDismiss(function (userInfo) {
                            if (userInfo) {
                                _this.userInfo = userInfo;
                                userInfo.avatar && (_this.avatarPath = userInfo.avatar);
                            }
                        });
                    }
                }
            ]
        }).present();
    };
    MinePage.prototype.exitSoftware = function () {
        var _this = this;
        this.alertCtrl.create({
            title: '确认退出软件？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        _this.platform.exitApp();
                    }
                }
            ]
        }).present();
    };
    MinePage.prototype.collect = function () {
        this.navCtrl.push(collect_1.CollectPage, {
            userName: "13521365896"
        });
        /*  this.alertCtrl.create({
            title: '二期开发',
            subTitle: '该功能正在完善，敬请期待！',
            buttons: ['OK']
          }).present();*/
    };
    MinePage.prototype.card = function () {
        this.navCtrl.push(bullet_1.BulletPage, {
            userName: "13521365896"
        });
        /*this.alertCtrl.create({
          title: '二期开发',
          subTitle: '该功能正在完善，敬请期待！',
          buttons: ['OK']
        }).present();*/
    };
    MinePage.prototype.school = function () {
        this.navCtrl.push(school_1.SchoolPage, {
            userName: "13521365896"
        });
    };
    MinePage.prototype.setting = function () {
        this.navCtrl.push(setting_1.SetPage, {
            userName: "13521365896"
        });
    };
    MinePage.prototype.scanQR = function () {
        var _this = this;
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                return false;
            }
            console.log("Scanned successfully!");
            console.log(barcodeData);
            _this.scanedText = barcodeData.text;
            _this.scanObj = {
                userName: _this.userInfo.username,
                goodsNumber: _this.scanedText
            };
            _this.mineService.insertUserScanInfo(_this.scanObj['userName'], _this.scanObj['goodsNumber']).subscribe(function (res) {
                if (res) {
                    _this.navCtrl.push(setting_1.SetPage, {
                        userName: _this.scanedText
                    });
                }
                else {
                    _this.alertCtrl.create({
                        title: '上传失败',
                        subTitle: '扫一扫数据上传失败,请重新扫描上传！',
                        buttons: ['好']
                    }).present();
                }
            });
        }, function (err) {
            console.log(err);
            return err;
        });
    };
    MinePage.prototype.scanOrigin = function () {
        this.navCtrl.push(scanOrigin_1.ScanOriginPage, {
            userName: "13521365896"
        });
    };
    return MinePage;
}());
MinePage = __decorate([
    core_1.Component({
        selector: 'page-mine',
        templateUrl: 'mine.html',
        providers: [MineService_1.MineService]
    })
], MinePage);
exports.MinePage = MinePage;
