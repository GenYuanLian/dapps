"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SelectPicDemoPage = (function () {
    function SelectPicDemoPage(navCtrl, httpService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.httpService = httpService;
        this.fileObjList = [];
        this.httpService.get('./assets/data/fileData.json').map(function (res) { return res.json(); }).subscribe(function (res) {
            if (res.success) {
                for (var _i = 0, _a = res.data; _i < _a.length; _i++) {
                    var fileObj = _a[_i];
                    _this.fileObjList.push({ 'thumbPath': fileObj.base64, 'origPath': fileObj.base64 });
                }
            }
        });
    }
    return SelectPicDemoPage;
}());
SelectPicDemoPage = __decorate([
    core_1.Component({
        selector: 'page-select-pic-demo',
        templateUrl: 'select-pic-demo.html'
    })
], SelectPicDemoPage);
exports.SelectPicDemoPage = SelectPicDemoPage;
