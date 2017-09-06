"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by yanxiaojun617@163.com on 3-12.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Validators = Validators_1 = (function (_super) {
    __extends(Validators, _super);
    function Validators() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Validators;
}(forms_1.Validators));
/*E-mail*/
Validators.email = function (control) {
    return Validators_1.validatorsByPattern('email', control, '[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?');
};
/*手机号码*/
Validators.phone = function (control) {
    return Validators_1.validatorsByPattern('phone', control, '1[0-9]{10,10}');
};
/*中文*/
Validators.chinese = function (control) {
    return Validators_1.validatorsByPattern('chinese', control, '[(\u4e00-\u9fa5)]+');
};
/*英文、数字包括下划线*/
Validators.legallyNamed = function (control) {
    return Validators_1.validatorsByPattern('legallyNamed', control, '[A-Za-z0-9_]+');
};
Validators.validatorsByPattern = function (name, control, pattern) {
    var validatorFn = Validators_1.pattern(pattern)(control);
    if (validatorFn != null) {
        validatorFn[name] = validatorFn['pattern'];
    }
    return validatorFn;
};
Validators = Validators_1 = __decorate([
    core_1.Injectable()
], Validators);
exports.Validators = Validators;
var Validators_1;
