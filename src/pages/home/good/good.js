"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Luffy on 2017/5/22.
 */
var core_1 = require("@angular/core");
var origin_1 = require("../origin/origin");
var status_1 = require("../status/status");
var GoodPage = (function () {
    function GoodPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.goodId = navParams.get('goodId');
    }
    GoodPage.prototype.toOrigin = function () {
        this.navCtrl.push(origin_1.OriginPage, {
            goodId: this.goodId
        });
    };
    GoodPage.prototype.toStatus = function () {
        this.navCtrl.push(status_1.StatusPage, {
            goodId: this.goodId
        });
    };
    return GoodPage;
}());
GoodPage = __decorate([
    core_1.Component({
        selector: 'page-good',
        templateUrl: 'good.html'
    })
], GoodPage);
exports.GoodPage = GoodPage;
