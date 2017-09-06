"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by yanxiaojun617@163.com on 12-27.
 */
var core_1 = require("@angular/core");
/**
 * Helper类存放和业务有关的公共方法
 * @description
 */
var Helper = (function () {
    function Helper(nativeService) {
        this.nativeService = nativeService;
    }
    Helper.prototype.initJpush = function () {
        if (!this.nativeService.isMobile()) {
            return;
        }
        window['plugins'].jPushPlugin.init();
        if (this.nativeService.isIos()) {
            window['plugins'].jPushPlugin.setDebugModeFromIos();
            window['plugins'].jPushPlugin.setApplicationIconBadgeNumber(0);
        }
        else {
            window['plugins'].jPushPlugin.setDebugMode(true);
            window['plugins'].jPushPlugin.setStatisticsOpen(true);
        }
        this.jPushAddEventListener();
    };
    Helper.prototype.jPushAddEventListener = function () {
        var _this = this;
        //判断系统设置中是否允许当前应用推送
        window['plugins'].jPushPlugin.getUserNotificationSettings(function (result) {
            if (result == 0) {
                console.log('系统设置中已关闭应用推送');
            }
            else if (result > 0) {
                console.log('系统设置中打开了应用推送');
            }
        });
        //点击通知进入应用程序时会触发的事件
        document.addEventListener("jpush.openNotification", function (event) {
            var content = _this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            console.log("jpush.openNotification" + content);
        }, false);
        //收到通知时会触发该事件
        document.addEventListener("jpush.receiveNotification", function (event) {
            var content = _this.nativeService.isIos() ? event['aps'].alert : event['alert'];
            console.log("jpush.receiveNotification" + content);
        }, false);
        //收到自定义消息时触发这个事件
        document.addEventListener("jpush.receiveMessage", function (event) {
            var message = _this.nativeService.isIos() ? event['content'] : event['message'];
            console.log("jpush.receiveMessage" + message);
        }, false);
        //设置标签/别名回调函数
        document.addEventListener("jpush.setTagsWithAlias", function (event) {
            console.log("onTagsWithAlias");
            var result = "result code:" + event['resultCode'] + " ";
            result += "tags:" + event['tags'] + " ";
            result += "alias:" + event['alias'] + " ";
            console.log(result);
        }, false);
    };
    //设置标签
    Helper.prototype.setTags = function () {
        if (!this.nativeService.isMobile()) {
            return;
        }
        var tags = this.nativeService.isAndroid() ? ['android'] : ['ios'];
        console.log('设置setTags:' + tags);
        window['plugins'].jPushPlugin.setTags(tags);
    };
    //设置别名,一个用户只有一个别名
    Helper.prototype.setAlias = function (userId) {
        if (!this.nativeService.isMobile()) {
            return;
        }
        console.log('设置setAlias:' + userId);
        //ios设置setAlias有bug,值必须为string类型,不能是number类型
        window['plugins'].jPushPlugin.setAlias('' + userId);
    };
    return Helper;
}());
Helper = __decorate([
    core_1.Injectable()
], Helper);
exports.Helper = Helper;
