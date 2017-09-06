"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by yanxiaojun617@163.com on 12-23.
 */
var core_1 = require("@angular/core");
var Constants_1 = require("./Constants");
var rxjs_1 = require("rxjs");
/**
 * 上传图片到文件服务器
 */
var FileService = FileService_1 = (function () {
    function FileService(httpService, nativeService) {
        this.httpService = httpService;
        this.nativeService = nativeService;
    }
    /**
     * 根据文件id获取文件信息
     * @param id 文件id
     * @return {Promise<TResult|T>}
     */
    FileService.prototype.getFileInfoById = function (id) {
        if (!id) {
            return rxjs_1.Observable.create(function (observer) {
                observer.next({ 'data': [], 'success': true });
            });
        }
        return this.httpService.get(Constants_1.FILE_SERVE_URL + '/getById', { id: id }).map(function (res) { return res.json(); });
    };
    /**
     * 根据文件id数组获取文件信息
     * @param ids id数组
     * @returns {Observable<R>}
     */
    FileService.prototype.getFileInfoByIds = function (ids) {
        if (!ids || ids.length == 0) {
            return rxjs_1.Observable.create(function (observer) {
                observer.next({ 'data': [], 'success': true });
            });
        }
        return this.httpService.get(Constants_1.FILE_SERVE_URL + '/getByIds', { ids: ids }).map(function (res) { return res.json(); });
    };
    /**
     * 批量上传图片,只支持上传base64字符串
     * @param fileObjList,数组中的对象必须包含bse64属性
     * @return {Promise<TResult|T>}
     */
    FileService.prototype.uploadMultiByBase64 = function (fileObjList) {
        if (!fileObjList || fileObjList.length == 0) {
            return rxjs_1.Observable.create(function (observer) {
                observer.next({ 'data': [], 'success': true });
            });
        }
        return this.httpService.post(Constants_1.FILE_SERVE_URL + '/appUpload?directory=ionic2_tabs', fileObjList).map(function (res) { return res.json(); });
    };
    /**
     * 上传单张图片,只支持上传base64字符串
     * @param FileObj,对象必须包含origPath属性
     * @return {Promise<TResult|T>}
     */
    FileService.prototype.uploadByBase64 = function (fileObj) {
        if (!fileObj.base64) {
            return rxjs_1.Observable.create(function (observer) {
                observer.next({ 'data': [], 'success': true });
            });
        }
        return this.httpService.post(Constants_1.FILE_SERVE_URL + '/appUpload?directory=ionic2_tabs', [fileObj]).map(function (res) { return res.json(); });
    };
    /**
     * 批量上传图片
     * @param fileObjList 数组中的对象必须包含origPath属性
     * @returns {any}
     */
    FileService.prototype.uploadMultiByFilePath = function (fileObjList) {
        var _this = this;
        if (fileObjList.length == 0) {
            return rxjs_1.Observable.create(function (observer) {
                observer.next({ 'data': [], 'success': true });
            });
        }
        return rxjs_1.Observable.create(function (observer) {
            _this.nativeService.showLoading();
            var fileObjs = [];
            var _loop_1 = function (fileObj) {
                _this.nativeService.convertImgToBase64(fileObj.origPath, function (base64) {
                    fileObjs.push({ 'base64': base64, 'type': FileService_1.getFileType(fileObj.origPath) });
                    if (fileObjs.length === fileObjList.length) {
                        _this.uploadMultiByBase64(fileObjs).subscribe(function (res) {
                            observer.next(res);
                            _this.nativeService.hideLoading();
                        });
                    }
                });
            };
            for (var _i = 0, fileObjList_1 = fileObjList; _i < fileObjList_1.length; _i++) {
                var fileObj = fileObjList_1[_i];
                _loop_1(fileObj);
            }
        });
    };
    /**
     * app上传单张图片
     * @param fileObj 对象必须包含origPath属性
     * @returns {any}
     */
    FileService.prototype.uploadByFilePath = function (fileObj) {
        var _this = this;
        if (!fileObj.origPath) {
            return rxjs_1.Observable.create(function (observer) {
                observer.next({ 'data': [], 'success': true });
            });
        }
        return rxjs_1.Observable.create(function (observer) {
            _this.nativeService.showLoading();
            _this.nativeService.convertImgToBase64(fileObj.origPath, function (base64) {
                var file = ({ 'base64': base64, 'type': FileService_1.getFileType(fileObj.origPath) });
                _this.uploadByBase64(file).subscribe(function (res) {
                    observer.next(res);
                    _this.nativeService.hideLoading();
                });
            });
        });
    };
    FileService.getFileType = function (path) {
        return path.substring(path.lastIndexOf('.') + 1);
    };
    return FileService;
}());
FileService = FileService_1 = __decorate([
    core_1.Injectable()
], FileService);
exports.FileService = FileService;
var FileService_1;
