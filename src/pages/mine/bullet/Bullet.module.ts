/**
 * Created by Gjp on 2017/9/19.
 */
import {NgModule} from '@angular/core';
import {IonicModule} from 'ionic-angular';
import {BulletPage} from "./bullet";
import {PaymentPage} from "./payment/payment";
import {ReceiptPage} from "./receipt/receipt";
import {QueryTransactionPage} from "./query-transaction/query-transaction";
import {TradingRecordPage} from "./trading-record/trading-record";
import {TransactionDetailsPage} from "./transaction-details/transaction-details";

@NgModule({
  imports: [IonicModule],
  declarations: [BulletPage, PaymentPage,ReceiptPage,QueryTransactionPage,TradingRecordPage,TransactionDetailsPage],
  entryComponents: [BulletPage, PaymentPage,ReceiptPage,QueryTransactionPage,TradingRecordPage,TransactionDetailsPage],
  providers: [],
  exports: [IonicModule]
})
export class BulletModule{
}
