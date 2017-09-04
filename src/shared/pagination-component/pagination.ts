import {Component, Input, Output, EventEmitter} from '@angular/core';
import {PAGE_SIZE} from "../../providers/Constants";

/**
 * @name 自定义分页组件
 * @description
 * @example <page-pagination [total]="18" (search)="doSearch($event)"></page-pagination>
 * @example <page-pagination [total]="total" (search)="doSearch($event)" pageSize="10" color="dark"></page-pagination>
 */
@Component({
  selector: 'page-pagination',
  templateUrl: 'pagination.html'
})
export class PaginationPage {

  @Input()
  total:number;//共多少条数据

  @Output()
  search = new EventEmitter<number>();//点击按钮出发的事件

  @Input()
  pageSize:number=PAGE_SIZE;//每页大小,默认5条

  @Input()
  color:string='primary';//主题颜色

  pageNum:number=1;//当前第几页,默认1

  constructor() {
  }

  btnClick(pageNum){
    this.pageNum = pageNum;
    this.search.emit(pageNum);
  }

  ceil(num){
    return Math.ceil(num);
  }

}
