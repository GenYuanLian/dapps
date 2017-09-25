import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MinePage} from './mine';
import {MineEditPage} from './mine-edit/mine-edit';
import {MineEditModalPage} from './mine-edit-modal/mine-edit-modal';
import {MineEditAvatarModalPage} from './mine-edit-avatar-modal/mine-edit-avatar-modal';
import {FeedBackPage} from "./feed-back/feed-back";
import {AboutPage} from "./about/about";
import {SetPage} from "./setting/setting";
import {UpdateLogPage} from "./update-log/update-log";
import {ShowPicturesPage} from "./show-pictures/show-pictures";
import {SharedModule} from "../../shared/shared.module";
import {CollectPage} from  "./collect/collect";
import {ScanOriginPage} from  "./scanOrigin/scanOrigin";
import {BulletPage} from "./bullet/bullet";
import {SchoolPage} from "./school/school";
import {AccountSafePage} from "./account-safe/account-safe";
import {NameIdentificationPage} from "./name-identification/name-identification";
import {GoodsPage} from "./goods/goods";
import {SchoolMenuPage} from "./school-menu/school-menu";
import {SchoolCollectionPage} from "./school-collection/school-collection";
import {GoodDetailPage} from "./scanOrigin/goodDetail/goodDetail";

@NgModule({
  imports: [IonicModule, SharedModule],
  declarations: [MinePage, MineEditPage, MineEditModalPage, MineEditAvatarModalPage, FeedBackPage, AboutPage, UpdateLogPage, ShowPicturesPage, SetPage,CollectPage,ScanOriginPage,AccountSafePage,BulletPage,SchoolPage,GoodDetailPage,SchoolMenuPage,SchoolCollectionPage,NameIdentificationPage,GoodsPage],
  entryComponents: [MinePage, MineEditPage, MineEditModalPage, MineEditAvatarModalPage, FeedBackPage, AboutPage, UpdateLogPage, ShowPicturesPage, SetPage,CollectPage,ScanOriginPage,AccountSafePage,BulletPage,SchoolPage,GoodDetailPage,SchoolMenuPage,SchoolCollectionPage,NameIdentificationPage,GoodsPage],
  providers: [],
  exports: [IonicModule]
})
export class MineModule {
}
