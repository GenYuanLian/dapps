/**
 * Created by Luffy on 2017/5/31.
 */
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {MarketPage} from "./market";

@NgModule({
  imports: [IonicModule],
  declarations: [MarketPage],
  entryComponents: [MarketPage],
  providers: [],
  exports: [IonicModule]
})
export class MarketModule {
}
