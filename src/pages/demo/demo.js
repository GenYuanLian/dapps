"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var pagination_demo_1 = require("./pagination-demo/pagination-demo");
var custom_icon_demo_1 = require("./custom-icon-demo/custom-icon-demo");
var chartjs_demo_1 = require("./chartjs-demo/chartjs-demo");
var select_pic_demo_1 = require("./select-pic-demo/select-pic-demo");
var DemoPage = (function () {
    function DemoPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    DemoPage.prototype.pagination = function () {
        this.navCtrl.push(pagination_demo_1.PaginationDemoPage);
    };
    DemoPage.prototype.customIcon = function () {
        this.navCtrl.push(custom_icon_demo_1.CustomIconDemoPage);
    };
    DemoPage.prototype.chartjs = function () {
        this.navCtrl.push(chartjs_demo_1.ChartjsDemoPage);
    };
    DemoPage.prototype.selectPic = function () {
        this.navCtrl.push(select_pic_demo_1.SelectPicDemoPage);
    };
    return DemoPage;
}());
DemoPage = __decorate([
    core_1.Component({
        selector: 'page-contact',
        templateUrl: 'demo.html'
    })
], DemoPage);
exports.DemoPage = DemoPage;
