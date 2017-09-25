"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mine_edit_modal_1 = require("../mine-edit-modal/mine-edit-modal");
var mine_edit_avatar_modal_1 = require("../mine-edit-avatar-modal/mine-edit-avatar-modal");
var MineEditPage = (function () {
    function MineEditPage(modalCtrl, params, helper) {
        this.modalCtrl = modalCtrl;
        this.params = params;
        this.helper = helper;
        this.avatarPath = params.get('avatarPath');
        this.userInfo = params.get('userInfo');
    }
    MineEditPage.prototype.viewAvatar = function ($event) {
        var _this = this;
        $event.stopPropagation();
        var modal = this.modalCtrl.create(mine_edit_avatar_modal_1.MineEditAvatarModalPage, { avatarPath: this.avatarPath });
        modal.present();
        modal.onDidDismiss(function (data) {
            data && (_this.avatarPath = data.avatarPath);
        });
    };
    MineEditPage.prototype.openModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(mine_edit_modal_1.MineEditModalPage, { 'userInfo': this.userInfo });
        modal.present();
        modal.onDidDismiss(function (userInfo) {
            userInfo && (_this.userInfo = userInfo);
        });
    };
    return MineEditPage;
}());
MineEditPage = __decorate([
    core_1.Component({
        selector: 'page-mine-edit',
        templateUrl: 'mine-edit.html'
    })
], MineEditPage);
exports.MineEditPage = MineEditPage;
