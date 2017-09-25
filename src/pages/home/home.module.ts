import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {HomePage} from './home';
import {GoodPage} from './good/good';
import {OriginPage} from './origin/origin';
import {StatusPage} from './status/status';

@NgModule({
  imports: [IonicModule],
  declarations: [HomePage, GoodPage, OriginPage, StatusPage],
  entryComponents: [HomePage, GoodPage, OriginPage, StatusPage],
  providers: [],
  exports: [IonicModule]
})
export class HomeModule {
}
