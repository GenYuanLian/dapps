"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Validators_1 = require("../../../providers/Validators");
var MineEditModalPage = (function () {
    function MineEditModalPage(params, viewCtrl, storage, formBuilder, nativeService) {
        var _this = this;
        this.params = params;
        this.viewCtrl = viewCtrl;
        this.storage = storage;
        this.formBuilder = formBuilder;
        this.nativeService = nativeService;
        this.verifyMessages = {
            'name': {
                'errorMsg': '',
                'required': '用户名为必填项',
                'minlength': '姓名最少2个字符',
                'chinese': '姓名必须是中文'
            },
            'phone': {
                'errorMsg': '',
                'required': '手机号码为必填项',
                'phone': '请输入正确的手机号码'
            },
            'email': {
                'errorMsg': '',
                'required': '电子邮箱为必填项',
                'email': '请输入正确的邮箱地址'
            }
        };
        this.userInfo = params.get('userInfo');
        this.userForm = this.formBuilder.group({
            name: [this.userInfo.name, [Validators_1.Validators.required, Validators_1.Validators.minLength(2), Validators_1.Validators.chinese]],
            phone: [this.userInfo.phone, [Validators_1.Validators.required, Validators_1.Validators.phone]],
            email: [this.userInfo.email, [Validators_1.Validators.required, Validators_1.Validators.email]]
        });
        this.userForm.valueChanges
            .subscribe(function (data) {
            var verifyMessages = _this.verifyMessages;
            for (var field in verifyMessages) {
                verifyMessages[field].errorMsg = '';
                var control = _this.userForm.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = verifyMessages[field];
                    for (var key in control.errors) {
                        messages[key] && (verifyMessages[field].errorMsg += messages[key] + ' ');
                    }
                }
            }
        });
    }
    MineEditModalPage.prototype.onSubmit = function () {
        Object.assign(this.userInfo, this.userForm.value);
        this.storage.set('UserInfo', this.userInfo);
        this.nativeService.showToast('保存成功');
        this.viewCtrl.dismiss(this.userInfo);
    };
    MineEditModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    return MineEditModalPage;
}());
MineEditModalPage = __decorate([
    core_1.Component({
        selector: 'page-mine-edit-modal',
        templateUrl: 'mine-edit-modal.html'
    })
], MineEditModalPage);
exports.MineEditModalPage = MineEditModalPage;
