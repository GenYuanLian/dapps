"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var update_log_1 = require("../update-log/update-log");
var feed_back_1 = require("../feed-back/feed-back");
var AboutPage = (function () {
    function AboutPage(navCtrl, nativeService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.nativeService = nativeService;
        this.versionNo = '1.0.0';
        if (this.nativeService.isMobile()) {
            this.nativeService.getVersionNumber().then(function (value) {
                _this.versionNo = value;
            });
        }
    }
    AboutPage.prototype.checkNewVersion = function () {
        this.nativeService.detectionUpgrade();
    };
    AboutPage.prototype.updateLog = function () {
        this.navCtrl.push(update_log_1.UpdateLogPage);
    };
    AboutPage.prototype.features = function () {
        this.nativeService.showToast('正在完善...');
    };
    AboutPage.prototype.feedBack = function () {
        this.navCtrl.push(feed_back_1.FeedBackPage);
    };
    return AboutPage;
}());
AboutPage = __decorate([
    core_1.Component({
        selector: 'page-about',
        templateUrl: 'about.html'
    })
], AboutPage);
exports.AboutPage = AboutPage;
