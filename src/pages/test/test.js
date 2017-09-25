"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var TestPage = (function () {
    function TestPage(testService) {
        this.testService = testService;
    }
    TestPage.prototype.ionViewDidEnter = function () {
    };
    TestPage.prototype.click = function () {
        this.scanStr = {
            userName: 'zhou',
            passWord: 'jfkdl365'
        };
        /* this.testService.insertUserScanInfo(this.scanStr['userName'],this.scanStr['goodsNumber']).subscribe(res => {
           console.log(res);
         });*/
        this.testService.getIsRegister(this.scanStr).subscribe(function (res) {
            console.log(res);
        });
    };
    return TestPage;
}());
TestPage = __decorate([
    core_1.Component({
        selector: 'page-test',
        templateUrl: 'test.html'
    })
], TestPage);
exports.TestPage = TestPage;
