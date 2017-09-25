"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var home_1 = require("../home/home");
var mine_1 = require("../mine/mine");
var test_1 = require("../test/test");
var demo_1 = require("../demo/demo");
var market_1 = require("../market/market");
var TabsPage = (function () {
    function TabsPage() {
        this.testRoot = test_1.TestPage;
        this.demoRoot = demo_1.DemoPage;
        this.homeRoot = home_1.HomePage;
        this.mineRoot = mine_1.MinePage;
        this.marketRoot = market_1.MarketPage;
    }
    return TabsPage;
}());
__decorate([
    core_1.ViewChild('mainTabs')
], TabsPage.prototype, "tabs", void 0);
TabsPage = __decorate([
    core_1.Component({
        templateUrl: 'tabs.html'
    })
], TabsPage);
exports.TabsPage = TabsPage;
