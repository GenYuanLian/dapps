"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Luffy on 2017/6/1.
 */
var core_1 = require("@angular/core");
var MineService_1 = require("../MineService");
var name_identification_1 = require("../name-identification/name-identification");
var school_menu_1 = require("../school-menu/school-menu");
var school_collection_1 = require("../school-collection/school-collection");
var SchoolPage = (function () {
    function SchoolPage(navCtrl, mineService, navParams, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.mineService = mineService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.schoolName = [];
        this.schoolArr = [];
        this.userName = navParams.get("userName");
        this.mineService.getSchoolName().subscribe(function (res) {
            _this.schoolName = res;
        });
        this.mineService.getUserIdentification(this.userName).subscribe(function (res) {
            console.log(res);
            if (!res['isIdentify']) {
                _this.alertCtrl.create({
                    title: '未实名认证',
                    subTitle: '实名认证之后才能获取对应服务，是否实名认证?',
                    buttons: [{ text: '取消' },
                        {
                            text: '确定',
                            handler: function () {
                                navCtrl.push(name_identification_1.NameIdentificationPage);
                            }
                        }
                    ]
                }).present();
            }
            else {
                console.log("已经是实名认证用户");
            }
        });
    }
    SchoolPage.prototype.getSelectedSchool = function () {
        var _this = this;
        if (this.select) {
            this.schoolArr = []; //清空数组，否则会叠加
            this.mineService.getSchoolContent(this.select).subscribe(function (res) {
                var data = res;
                for (var i = 0; i < data.length; i++) {
                    _this.schoolArr.push(data[i]);
                }
            });
        }
    };
    SchoolPage.prototype.goToCollection = function () {
        if (!this.select) {
            this.alertCtrl.create({
                title: '未关联学校',
                subTitle: '请关联学校之后再查看学校食采情况',
                buttons: ['OK']
            }).present();
        }
        else {
            this.navCtrl.push(school_collection_1.SchoolCollectionPage, {
                schoolArr: this.schoolArr
            });
        }
    };
    SchoolPage.prototype.goToMenu = function () {
        if (!this.select) {
            this.alertCtrl.create({
                title: '未关联学校',
                subTitle: '请关联学校之后再查看学校阳光菜单',
                buttons: ['OK']
            }).present();
        }
        else {
            this.navCtrl.push(school_menu_1.SchoolMenuPage, {
                schoolId: this.select
            });
        }
    };
    return SchoolPage;
}());
SchoolPage = __decorate([
    core_1.Component({
        selector: 'page-school',
        templateUrl: 'school.html',
        providers: [MineService_1.MineService]
    })
], SchoolPage);
exports.SchoolPage = SchoolPage;
