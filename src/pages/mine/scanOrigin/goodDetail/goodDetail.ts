import {Component,ViewChild,ElementRef} from '@angular/core';
import {NavController,NavParams,Platform} from 'ionic-angular';
import {GoodDetailService} from "./GoodDetailService";
import {NativeService} from "../../../../providers/NativeService";



declare var BMap;
declare var echarts;

@Component({
  selector: 'page-goodDetail',
  templateUrl: 'goodDetail.html',
  providers:[GoodDetailService]
})
export class GoodDetailPage {
    @ViewChild('map') mapElement: ElementRef;
    @ViewChild('tempChart') tempElement: ElementRef;
    goodsNumber: string;
    Name:string;
    bathNote:string;
    Time:string;
    ProductionDate:string;
    Warrant:string;
    ProductDes:string;
    ProductStatus:string;
    data0=[]; //记录出入库数组 {Longitude:116.432045,Latitude:39.910683},{Longitude: 120.129721,Latitude:30.314429},{Longitude:121.491121, Latitude:25.127053}
    data0Deal=[];//数据处理 拆分
    data0Deal2=[];//数据处理  去掉经纬度为0
    data1=[]; //记录温湿度数组
    data1Deal=[];//数据处理 去掉经纬度为0
    constructor(private navCtrl: NavController, private nativeService: NativeService,private goodDetailService: GoodDetailService, private navParams: NavParams) {
      this.goodsNumber = navParams.get("goodsNumber");
      this.Name = navParams.get("Name");
      this.bathNote = navParams.get("bathNote");
      this.Time = navParams.get("Time");
      this.ProductionDate = navParams.get("ProductionDate");
      this.Warrant = navParams.get("Warrant");
      this.ProductDes = navParams.get("ProductDes");
      this.ProductStatus = navParams.get("ProductStatus");
      this.goodDetailService.getGoodsDetail(401).subscribe(res => {
        var data0=res[0];
        for(let i=0;i<data0.length;i++){
          this.data0.push(data0[i]);
        }
        //数据处理 拆分
        this.data0Deal=[];
        for(let i=0;i<this.data0.length;i++){
          var obj =  {
            warehouseName: "",
            date: "",
            state:""
          };
          if(this.data0[i].bindDate!=""){
            obj.date=this.data0[i].bindDate;
            if(this.data0[i].type==0){
              obj.warehouseName=this.data0[i].warehouseName;
              obj.state="已入库";
            }else{
              obj.warehouseName="车"+this.data0[i].warehouseName;
              obj.state="已入车";
            }
            this.data0Deal.push(obj);
          }
          var obj4 =  {
            warehouseName: "",
            date: "",
            state:""
          };
          if(this.data0[i].unbindDate!=""){
            obj4.date=this.data0[i].unbindDate;
            if(this.data0[i].type==0){
              obj4.warehouseName=this.data0[i].warehouseName;
              obj4.state="已出库";
            }else{
              obj4.warehouseName="车"+this.data0[i].warehouseName;
              obj4.state="已出车";
            }
            this.data0Deal.push(obj4);
          }
        }

        //数据处理  去掉经纬度为0
        this.data0Deal2=[];
        for(let i=0;i<this.data0.length;i++){
          var obj2 = {
            date: "",
            warehouseName: "",
            latitude: 0,
            longitude: 0
          };
          if(this.data0[i].longitude!=0&&this.data0[i].latitude!=0){
            console.log("妈的么得");
            obj2.date=this.data0[i].bindDate;
            obj2.warehouseName=this.data0[i].warehouseName;
            obj2.longitude=this.data0[i].longitude;
            obj2.latitude=this.data0[i].latitude;
            this.data0Deal2.push(obj2);
          }
        }
        console.log("数据处理长度"+this.data0Deal2.length);
        console.log(this.data0Deal2[0].warehouseName + "纬度9999");

        //数据处理  去掉经纬度为0
        var data1=res[1];
        for(let i=0;i<data1.length;i++){
          this.data1.push(data1[i]);
        }
        for(let i=0;i<this.data1.length;i++){
          var obj3 =  {
            date: "",
            warehouseName: "",
            latitude: 0,
            longitude: 0
          };
          if((this.data1[i].latitude>0&&this.data1[i].latitude<200)&&(this.data1[i].longitude>0&&this.data1[i].longitude<200)){
            obj3.date=this.data1[i].date;
            obj3.warehouseName=this.data1[i].warehouseName;
            obj3.latitude=this.data1[i].latitude;
            obj3.longitude=this.data1[i].longitude;
            this.data1Deal.push(obj3);
          }
        }
        console.log("数据处理长度" + this.data1Deal.length);
        this.showmap();
      });

    }

  showmap() {
    let map = this.mapElement = new BMap.Map(this.mapElement.nativeElement, {enableMapClick: true});//创建地图实例
    map.enableScrollWheelZoom();//启动滚轮放大缩小，默认禁用
    map.enableContinuousZoom();//连续缩放效果，默认禁用
    /*let point = new BMap.Point(116.403119, 39.917591);*/
    //地图放大缩小控件
    let sizeMap = new BMap.Size(10, 80);//显示位置
    map.addControl(new BMap.NavigationControl({
      //anchor: BMAP_ANCHOR_BOTTOM_RIGHT,//显示方向
      offset: sizeMap
    }));
    map.clearOverlays();
    var points = [];
    var markers =[];
    if (this.data1Deal.length > 0) {
      console.log("到没到1111");
      for (let i = 0; i < this.data1Deal.length; i++) {
        if (i == 0) {
          console.log("GPS经纬度" + this.data1Deal[0].longitude + this.data1Deal[0].latitude);
          var baiduZuobiao = [];
          baiduZuobiao = this.gpsToBd(this.data1Deal[0].longitude, this.data1Deal[0].latitude);
          console.log("baidu经纬度" + baiduZuobiao[0] + baiduZuobiao[1]);
          var thePoint = new BMap.Point(baiduZuobiao[0], baiduZuobiao[1]);
          points.push(thePoint);
        } else {
          if ((this.data1Deal[i].longitude != this.data1Deal[i - 1].latitude || this.data1Deal[i].latitude != this.data1Deal[i - 1].latitude)) {
            var baiduZuobiao = [];
            baiduZuobiao = this.gpsToBd(this.data1Deal[i].longitude, this.data1Deal[i].latitude);
            var thePoint = new BMap.Point(baiduZuobiao[0], baiduZuobiao[1]);
            points.push(thePoint);
          }
        }
      }
      map.centerAndZoom(points[0], 12);//设置中心和地图显示级别插入百度的一些控件，展示在地图中
      for (let i = 0; i <points.length; i++) {
          var myIcon = new BMap.Icon("./assets/img/marker4.png", new BMap.Size(23, 25));
          var marker=new BMap.Marker(points[i],{icon:myIcon});
          markers.push(marker);
          map.addOverlay(marker);
        }
        for (let i = 0; i < markers.length; i++) {
          map.addOverlay(markers[i]);
          (function(info){
            markers[i].addEventListener('click', function(){
              var opts = {
                width: 100,     // 信息窗口宽度
                height: 50,     // 信息窗口高度
                title:  info.warehouseName// 信息窗口标题this.data0Deal2[i].warehouseName
              }
              var infoWindow = new BMap.InfoWindow("时间:"+info.date , opts);  // 创建信息窗口对象
              map.openInfoWindow(infoWindow, points[i]);
            });
          })(this.data1Deal[i]);
        }
        var polyline = new BMap.Polyline(points, {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5});   //创建折线
        map.addOverlay(polyline);

    }else{
      console.log("到没到2222");
      for (let i = 0; i < this.data0Deal2.length; i++) {
        var thePoint = new BMap.Point(this.data0Deal2[i].longitude, this.data0Deal2[i].latitude);
        points.push(thePoint);
      }
      console.log("pppppp"+points.length);
      for (let i = 0; i <points.length; i++) {
        var myIcon = new BMap.Icon("./assets/img/marker4.png", new BMap.Size(23, 25));
        var marker=new BMap.Marker(points[i],{icon:myIcon});
        markers.push(marker);
        map.addOverlay(marker);
      }
      map.centerAndZoom(points[0], 12);//设置中心和地图显示级别插入百度的一些控件，展示在地图中
      for (let i = 0; i <markers.length; i++) {
        (function(info){
          markers[i].addEventListener('click', function(){
            var opts = {
              width: 100,     // 信息窗口宽度
              height: 50,     // 信息窗口高度
              title:  info.warehouseName// 信息窗口标题this.data0Deal2[i].warehouseName
            }
            var infoWindow = new BMap.InfoWindow("时间:"+info.date , opts);  // 创建信息窗口对象
            map.openInfoWindow(infoWindow, points[i]);
          });
        })(this.data0Deal2[i]);
      }
      var polyline = new BMap.Polyline(points, {strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5});   //创建折线
      map.addOverlay(polyline);
    }

  }

  gpsToBd(lon,lat) {
    var  pi = 3.14159265358979324;
    var  a = 6378245.0;
    var  ee = 0.00669342162296594323;
    var  x_pi = 3.14159265358979324 * 3000.0 / 180.0;

    var dLat = transformLat(lon - 105.0, lat - 35.0);
    var dLon = transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    var mgLat = lat + dLat;
    var mgLon = lon + dLon;

    var x = mgLon, y = mgLat;
    var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    var bd_lon = z * Math.cos(theta) + 0.0065;
    var bd_lat = z * Math.sin(theta) + 0.006;

    var baiduZuobiao=[];
    baiduZuobiao[0]=bd_lon;
    baiduZuobiao[1]=bd_lat;
    return baiduZuobiao;

    function transformLat( lat,  lon) {
      var ret = -100.0 + 2.0 * lat + 3.0 * lon + 0.2 * lon * lon + 0.1 * lat * lon + 0.2 * Math.sqrt(Math.abs(lat));
      ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(lon * pi) + 40.0 * Math.sin(lon / 3.0 * pi)) * 2.0 / 3.0;
      ret += (160.0 * Math.sin(lon / 12.0 * pi) + 320 * Math.sin(lon * pi  / 30.0)) * 2.0 / 3.0;
      return ret;
    }

    function transformLon( lat,  lon) {
      var ret = 300.0 + lat + 2.0 * lon + 0.1 * lat * lat + 0.1 * lat * lon + 0.1 * Math.sqrt(Math.abs(lat));
      ret += (20.0 * Math.sin(6.0 * lat * pi) + 20.0 * Math.sin(2.0 * lat * pi)) * 2.0 / 3.0;
      ret += (20.0 * Math.sin(lat * pi) + 40.0 * Math.sin(lat / 3.0 * pi)) * 2.0 / 3.0;
      ret += (150.0 * Math.sin(lat / 12.0 * pi) + 300.0 * Math.sin(lat / 30.0 * pi)) * 2.0 / 3.0;
      return ret;
    }
  }
    ionViewDidEnter(){
      let ctx = this.tempElement.nativeElement;
      let chart = echarts.init(ctx);
      var colors = ['#5793f3', '#d14a61'];
      var date=[];
      for(let i=0;i<this.data1.length;i++){
        date.push(this.data1[i].date);
      }
      var humidity=[];
      for(let i=0;i<this.data1.length;i++){
        humidity.push(this.data1[i].humidity);
      }
      var temperature=[];
      for(let i=0;i<this.data1.length;i++){
        temperature.push(this.data1[i].temperature);
      }


      chart.setOption({
       /* title: {
          text: '温湿度走势'
        },*/
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['温度','湿度']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            show:false,
            rotate: 45//倾斜度 -90 至 90 默认为0
          },
            boundaryGap: false,
          data: date
        },
        yAxis: [
            {
              type: 'value',
              name: '湿度',
              min: 0,
              max: 100,
              position: 'right',
              axisLine: {
                lineStyle: {
                    color: colors[0]
                }
              },
              axisLabel: {
                  formatter: '{value} % '
              }
            },
            {
              type: 'value',
              name: '温度',
              min: -20,
              max: 35,
              position: 'left',
              axisLine: {
                lineStyle: {
                    color: colors[1]
                }
              },
              axisLabel: {
                  formatter: '{value} °C'
              }
            }
        ],
        series: [
          {
            name:'温度',
            type:'line',
            yAxisIndex:1,
            data:temperature
          },
          {
            name:'湿度',
            type:'line',
            data:humidity
          }
        ]
      });
    }

}
