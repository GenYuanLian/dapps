"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Luffy on 2017/5/27.
 */
var core_1 = require("@angular/core");
var about_1 = require("../about/about");
var name_identification_1 = require("../name-identification/name-identification");
var account_safe_1 = require("../account-safe/account-safe");
var SetPage = (function () {
    function SetPage(navCtrl, navParams, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.userName = navParams.get('userName');
    }
    SetPage.prototype.userSafe = function () {
        this.navCtrl.push(account_safe_1.AccountSafePage, {
            userName: this.userName
        });
        /*this.alertCtrl.create({
           title: '二期开发',
           subTitle: '该功能正在开发，敬请期待',
           buttons: ['好']
         }).present();*/
    };
    SetPage.prototype.nameIdentification = function () {
        this.navCtrl.push(name_identification_1.NameIdentificationPage, {
            userName: this.userName
        });
    };
    SetPage.prototype.about = function () {
        this.navCtrl.push(about_1.AboutPage);
    };
    return SetPage;
}());
SetPage = __decorate([
    core_1.Component({
        selector: 'page-setting',
        templateUrl: 'setting.html'
    })
], SetPage);
exports.SetPage = SetPage;
