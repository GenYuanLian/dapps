"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Constants_1 = require("../../../providers/Constants");
var MineEditAvatarModalPage = (function () {
    function MineEditAvatarModalPage(params, viewCtrl, fileService, nativeService, storage) {
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.fileService = fileService;
        this.nativeService = nativeService;
        this.storage = storage;
        this.isChange = false; //头像是否改变标识
        this.avatarPath = params.get('avatarPath');
    }
    MineEditAvatarModalPage.prototype.getPicture = function (type) {
        var _this = this;
        var options = {
            targetWidth: 256,
            targetHeight: 256
        };
        if (type == 1) {
            this.nativeService.getPictureByCamera(options).then(function (imageBase64) {
                _this.getPictureSuccess(imageBase64);
            });
        }
        else {
            this.nativeService.getPictureByPhotoLibrary(options).then(function (imageBase64) {
                _this.getPictureSuccess(imageBase64);
            });
        }
    };
    MineEditAvatarModalPage.prototype.getPictureSuccess = function (imageBase64) {
        this.isChange = true;
        this.imageBase64 = imageBase64;
        this.avatarPath = 'data:image/jpg;base64,' + imageBase64;
    };
    MineEditAvatarModalPage.prototype.saveAvatar = function () {
        var _this = this;
        if (this.isChange) {
            var fileObj = { 'base64': this.imageBase64 };
            this.fileService.uploadByBase64(fileObj).subscribe(function (result) {
                if (result.success) {
                    var origPath_1 = Constants_1.FILE_SERVE_URL + result.data[0].origPath;
                    _this.storage.get('UserInfo').then(function (userInfo) {
                        userInfo.avatar = origPath_1;
                        _this.storage.set('UserInfo', userInfo);
                    });
                    _this.viewCtrl.dismiss({ avatarPath: origPath_1 });
                    //这里需要保存avatar字段到用户表
                }
            });
        }
        else {
            this.dismiss();
        }
    };
    MineEditAvatarModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return MineEditAvatarModalPage;
}());
MineEditAvatarModalPage = __decorate([
    core_1.Component({
        selector: 'page-mine-edit-avatar-modal',
        templateUrl: 'mine-edit-avatar-modal.html'
    })
], MineEditAvatarModalPage);
exports.MineEditAvatarModalPage = MineEditAvatarModalPage;
