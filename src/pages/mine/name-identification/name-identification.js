"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Luffy on 2017/6/5.
 */
var core_1 = require("@angular/core");
var MineService_1 = require("../MineService");
var forms_1 = require("@angular/forms");
var NameIdentificationPage = (function () {
    function NameIdentificationPage(navCtrl, navParams, alertCtrl, mineService, formBuilder) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.mineService = mineService;
        this.formBuilder = formBuilder;
        this.fileObjList = [];
        this.userName = navParams.get('userName');
        this.isIdentify = false;
        this.mineService.getUserIdentification(this.userName).subscribe(function (res) {
            _this.isIdentify = res['isIdentify'];
            _this.inputDisabled = _this.isIdentify;
            _this.idNumber = res['idNumber'];
            if (_this.idNumber != "") {
                _this.idForm.value.idNumber = _this.idNumber;
            }
        });
        this.idForm = this.formBuilder.group({
            idNumber: ['', [forms_1.Validators.required, forms_1.Validators.minLength(18)]],
        });
    }
    NameIdentificationPage.prototype.uploadIDCard = function () {
        var _this = this;
        console.log(this.idForm.value);
        this.mineService.uploadIdentification(this.userName, this.idForm.value.idNumber).subscribe(function (res) {
            console.log(res);
            if (!res['success']) {
                _this.alertCtrl.create({
                    title: '实名认证失败',
                    subTitle: '系统故障，请稍后再试',
                    buttons: ['OK']
                }).present();
            }
            else {
                _this.navCtrl.pop();
            }
        });
        /* this.fileService.uploadMultiByFilePath(this.fileObjList).subscribe(res => {
           this.navCtrl.pop();
         });*/
    };
    NameIdentificationPage.prototype.inputChange = function () {
        this.inputDisabled = false;
    };
    return NameIdentificationPage;
}());
NameIdentificationPage = __decorate([
    core_1.Component({
        selector: 'page-name-identification',
        templateUrl: 'name-identification.html',
        providers: [MineService_1.MineService]
    })
], NameIdentificationPage);
exports.NameIdentificationPage = NameIdentificationPage;
