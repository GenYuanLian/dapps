"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
var core_1 = require("@angular/core");
var Constants_1 = require("./Constants");
//declare var cordova: any;
var NativeService = (function () {
    function NativeService(platform, toastCtrl, alertCtrl, appVersion, camera, toast, transfer, file, inAppBrowser, imagePicker, network, loadingCtrl, barcodeScanner) {
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.appVersion = appVersion;
        this.camera = camera;
        this.toast = toast;
        this.transfer = transfer;
        this.file = file;
        this.inAppBrowser = inAppBrowser;
        this.imagePicker = imagePicker;
        this.network = network;
        this.loadingCtrl = loadingCtrl;
        this.barcodeScanner = barcodeScanner;
        this.loadingIsOpen = false;
    }
    NativeService.prototype.warn = function (info) {
        console.log('%cNativeService/' + info, 'color:#e8c406');
    };
    /**
     * 通过浏览器打开url
     */
    NativeService.prototype.openUrlByBrowser = function (url) {
        this.inAppBrowser.create(url, '_system');
    };
    /*扫描二维码*/
    NativeService.prototype.scanQR = function () {
        this.barcodeScanner.scan().then(function (barcodeData) {
            if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                return false;
            }
            console.log("Scanned successfully!");
            console.log(barcodeData);
            return JSON.stringify(barcodeData);
            ;
        }, function (err) {
            console.log(err);
            return err;
        });
        /* let promise:Promise<String> = this.barcodeScanner.scan().then((barcodeData) => {
           if (barcodeData.cancelled) {
             console.log("User cancelled the action!");
             return false;
           }
           console.log("Scanned successfully!");
           console.log(barcodeData);
           return barcodeData;
         }, (err) => {
           console.log(err);
           return err;
         });
         return promise;*/
    };
    /**
     * 检查app是否需要升级
     */
    NativeService.prototype.detectionUpgrade = function () {
        var _this = this;
        //这里连接后台判断是否需要升级,不需要升级就return
        this.alertCtrl.create({
            title: '升级',
            subTitle: '发现新版本,是否立即升级？',
            buttons: [{ text: '取消' },
                {
                    text: '确定',
                    handler: function () {
                        _this.downloadApp();
                    }
                }
            ]
        }).present();
    };
    /**
     * 下载安装app
     */
    NativeService.prototype.downloadApp = function () {
        if (this.isAndroid()) {
            var alert_1 = this.alertCtrl.create({
                title: '下载进度：0%',
                enableBackdropDismiss: false,
                buttons: ['后台下载']
            });
            alert_1.present();
            var fileTransfer = this.transfer.create();
            var apk_1 = this.file.externalRootDirectory + 'android.apk'; //apk保存的目录
            fileTransfer.download(Constants_1.APK_DOWNLOAD, apk_1).then(function () {
                window['install'].install(apk_1.replace('file://', ''));
            });
            fileTransfer.onProgress(function (event) {
                var num = Math.floor(event.loaded / event.total * 100);
                if (num === 100) {
                    alert_1.dismiss();
                }
                else {
                    var title = document.getElementsByClassName('alert-title')[0];
                    title && (title.innerHTML = '下载进度：' + num + '%');
                }
            });
        }
        if (this.isIos()) {
            this.openUrlByBrowser(Constants_1.APP_DOWNLOAD);
        }
    };
    /**
     * 是否真机环境
     * @return {boolean}
     */
    NativeService.prototype.isMobile = function () {
        return this.platform.is('mobile') && !this.platform.is('mobileweb');
    };
    /**
     * 是否android真机环境
     * @return {boolean}
     */
    NativeService.prototype.isAndroid = function () {
        return this.isMobile() && this.platform.is('android');
    };
    /**
     * 是否ios真机环境
     * @return {boolean}
     */
    NativeService.prototype.isIos = function () {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    };
    /**
     * 统一调用此方法显示提示信息
     * @param message 信息内容
     * @param duration 显示时长
     */
    NativeService.prototype.showToast = function (message, duration) {
        if (message === void 0) { message = '操作完成'; }
        if (duration === void 0) { duration = 2000; }
        if (this.isMobile()) {
            this.toast.show(message, String(duration), 'center').subscribe();
        }
        else {
            this.toastCtrl.create({
                message: message,
                duration: duration,
                position: 'middle',
                showCloseButton: false
            }).present();
        }
    };
    ;
    /**
     * 统一调用此方法显示loading
     * @param content 显示的内容
     */
    NativeService.prototype.showLoading = function (content) {
        var _this = this;
        if (content === void 0) { content = ''; }
        if (!this.loadingIsOpen) {
            this.loadingIsOpen = true;
            this.loading = this.loadingCtrl.create({
                content: content
            });
            this.loading.present();
            setTimeout(function () {
                _this.loadingIsOpen && _this.loading.dismiss();
                _this.loadingIsOpen = false;
            }, 10000);
        }
    };
    ;
    /**
     * 关闭loading
     */
    NativeService.prototype.hideLoading = function () {
        this.loadingIsOpen && this.loading.dismiss();
        this.loadingIsOpen = false;
    };
    ;
    /**
     * 使用cordova-plugin-camera获取照片
     * @param options
     * @returns {Promise<string>}
     */
    NativeService.prototype.getPicture = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var ops = Object.assign({
            sourceType: this.camera.PictureSourceType.CAMERA,
            destinationType: this.camera.DestinationType.DATA_URL,
            quality: 100,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 1000,
            targetHeight: 1000,
            saveToPhotoAlbum: true,
            correctOrientation: true //设置摄像机拍摄的图像是否为正确的方向
        }, options);
        return new Promise(function (resolve) {
            _this.camera.getPicture(ops).then(function (imgData) {
                resolve(imgData);
            }, function (err) {
                err == 20 && _this.showToast('没有权限,请在设置中开启权限');
                _this.warn('getPicture:' + err);
            });
        });
    };
    ;
    /**
     * 通过拍照获取照片
     * @param options
     * @return {Promise<string>}
     */
    NativeService.prototype.getPictureByCamera = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve) {
            _this.getPicture(Object.assign({
                sourceType: _this.camera.PictureSourceType.CAMERA,
                destinationType: _this.camera.DestinationType.DATA_URL //DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
            }, options)).then(function (imgData) {
                resolve(imgData);
            }).catch(function (err) {
                String(err).indexOf('cancel') != -1 ? _this.showToast('取消拍照', 1500) : _this.showToast('获取照片失败');
            });
        });
    };
    ;
    /**
     * 通过图库获取照片
     * @param options
     * @return {Promise<string>}
     */
    NativeService.prototype.getPictureByPhotoLibrary = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        return new Promise(function (resolve) {
            _this.getPicture(Object.assign({
                sourceType: _this.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: _this.camera.DestinationType.DATA_URL //DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
            }, options)).then(function (imgData) {
                resolve(imgData);
            }).catch(function (err) {
                String(err).indexOf('cancel') != -1 ? _this.showToast('取消选择图片', 1500) : _this.showToast('获取照片失败');
            });
        });
    };
    ;
    /**
     * 通过图库选择多图
     * @param options
     * @return {Promise<T>}
     */
    NativeService.prototype.getMultiplePicture = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var that = this;
        var destinationType = options['destinationType'] || 0; //0:base64字符串,1:图片url
        return new Promise(function (resolve) {
            _this.imagePicker.getPictures(Object.assign({
                maximumImagesCount: 6,
                width: 1000,
                height: 1000,
                quality: 100 //图像质量，范围为0 - 100
            }, options)).then(function (files) {
                if (destinationType === 1) {
                    resolve(files);
                }
                else {
                    var imgBase64s_1 = []; //base64字符串数组
                    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                        var fileUrl = files_1[_i];
                        that.convertImgToBase64(fileUrl, function (base64) {
                            imgBase64s_1.push(base64);
                            if (imgBase64s_1.length === files.length) {
                                resolve(imgBase64s_1);
                            }
                        });
                    }
                }
            }).catch(function (err) {
                _this.warn('getMultiplePicture:' + err);
                _this.showToast('获取照片失败');
            });
        });
    };
    ;
    /**
     * 根据图片绝对路径转化为base64字符串
     * @param url 绝对路径
     * @param callback 回调函数
     */
    NativeService.prototype.convertImgToBase64 = function (url, callback) {
        this.getFileContentAsBase64(url, function (base64Image) {
            callback.call(this, base64Image.substring(base64Image.indexOf(';base64,') + 8));
        });
    };
    NativeService.prototype.getFileContentAsBase64 = function (path, callback) {
        function fail(err) {
            console.log('Cannot found requested file' + err);
        }
        function gotFile(fileEntry) {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function (e) {
                    var content = this.result;
                    callback(content);
                };
                reader.readAsDataURL(file);
            });
        }
        this.file.resolveLocalFilesystemUrl(path).then(function (fileEnter) { return gotFile(fileEnter); }).catch(function (err) { return fail(err); });
        // window['resolveLocalFileSystemURL'](path, gotFile, fail);
    };
    /**
     * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
     */
    NativeService.prototype.getNetworkType = function () {
        if (!this.isMobile()) {
            return 'wifi';
        }
        return this.network.type;
    };
    /**
     * 判断是否有网络
     * @returns {boolean}
     */
    NativeService.prototype.isConnecting = function () {
        return this.getNetworkType() != 'none';
    };
    /**
     * 获得app版本号,如0.01
     * @description  对应/config.xml中version的值
     * @returns {Promise<string>}
     */
    NativeService.prototype.getVersionNumber = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appVersion.getVersionNumber().then(function (value) {
                resolve(value);
            }).catch(function (err) {
                _this.warn('getVersionNumber:' + err);
            });
        });
    };
    /**
     * 获得app name,如ionic2_tabs
     * @description  对应/config.xml中name的值
     * @returns {Promise<string>}
     */
    NativeService.prototype.getAppName = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appVersion.getAppName().then(function (value) {
                resolve(value);
            }).catch(function (err) {
                _this.warn('getAppName:' + err);
            });
        });
    };
    /**
     * 获得app包名/id,如com.kit.ionic2tabs
     * @description  对应/config.xml中id的值
     * @returns {Promise<string>}
     */
    NativeService.prototype.getPackageName = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.appVersion.getPackageName().then(function (value) {
                resolve(value);
            }).catch(function (err) {
                _this.warn('getPackageName:' + err);
            });
        });
    };
    /**
     * 获得用户当前坐标
     * @return {Promise<Position>}
     */
    NativeService.prototype.getUserLocation = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.isMobile()) {
                LocationPlugin.getLocation(function (data) {
                    resolve({ 'lng': data.longitude, 'lat': data.latitude });
                }, function (msg) {
                    alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
                    _this.warn('getUserLocation:' + msg);
                });
            }
            else {
                _this.warn('getUserLocation:非手机环境,即测试环境返回固定坐标');
                resolve({ 'lng': 113.350912, 'lat': 23.119495 });
            }
        });
    };
    /**
     * 地图导航
     * @param startPoint 开始坐标
     * @param endPoint 结束坐标
     * @param type 0实时导航,1模拟导航,默认为模拟导航
     * @return {Promise<string>}
     */
    NativeService.prototype.navigation = function (startPoint, endPoint, type) {
        var _this = this;
        if (type === void 0) { type = 1; }
        return new Promise(function (resolve) {
            if (_this.platform.is('mobile') && !_this.platform.is('mobileweb')) {
                AMapNavigation.navigation({
                    lng: startPoint.lng,
                    lat: startPoint.lat
                }, {
                    lng: endPoint.lng,
                    lat: endPoint.lat
                }, type, function (message) {
                    resolve(message);
                }, function (err) {
                    alert('导航失败:' + err);
                    this.warn('navigation:' + err);
                });
            }
            else {
                _this.showToast('非手机环境不能导航');
            }
        });
    };
    return NativeService;
}());
NativeService = __decorate([
    core_1.Injectable()
], NativeService);
exports.NativeService = NativeService;
