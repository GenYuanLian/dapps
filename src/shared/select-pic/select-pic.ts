import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NavController, ActionSheetController} from 'ionic-angular';
import {PhotoViewer} from '@ionic-native/photo-viewer';
import {NativeService} from "../../providers/NativeService";
import {FileObj} from "../../model/FileObj";

@Component({
  selector: 'page-select-pic',
  templateUrl: 'select-pic.html',
  providers: [PhotoViewer]
})
export class SelectPicPage {

  @Input()
  max: number = 4;  //最多可选择多少张图片，默认为4张

  @Input()
  destinationType: number = 1;  //期望返回的图片格式,默认1图片路径,0为返回base64,图片太大base64预览会卡

  @Input()
  allowAdd: boolean = true;  //是否允许新增

  @Input() fileObjList: FileObj[] = [];
  @Output() fileObjListChange = new EventEmitter<any>();

  constructor(public navCtrl: NavController,
              private actionSheetCtrl: ActionSheetController,
              private nativeService: NativeService,
              private photoViewer: PhotoViewer) {
    console.log(this.allowAdd)
  }

  addPicture() {
    let that = this;
    that.actionSheetCtrl.create({
      buttons: [
        {
          text: '从相册选择',
          handler: () => {
            that.nativeService.getMultiplePicture({//从相册多选
              maximumImagesCount: (that.max - that.fileObjList.length),
              destinationType: this.destinationType
            }).then(imgs => {
              for (let img of <string[]>imgs) {
                that.getPictureSuccess(img);
              }
            });
          }
        },
        {
          text: '拍照',
          handler: () => {
            that.nativeService.getPictureByCamera({
              destinationType: this.destinationType
            }).then(img => {
              that.getPictureSuccess(img);
            });
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    }).present();
  }

  private getPictureSuccess(img) {
    if (this.destinationType == 0) {
      img = 'data:image/jpg;base64,' + img;
    }
    let fileObj = <FileObj>{'origPath': img, 'thumbPath': img};
    this.fileObjList.push(fileObj);
    this.fileObjListChange.emit(this.fileObjList);
  }

  showPictures(img) {
    this.photoViewer.show(img);
  }

  deletePic(i) {
    let that = this;
    that.actionSheetCtrl.create({
      buttons: [
        {
          text: '删除',
          role: 'destructive',
          handler: () => {
            that.fileObjList.splice(i, 1);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    }).present();
  }
}
