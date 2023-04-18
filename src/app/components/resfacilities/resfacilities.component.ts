import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-resfacilities',
  templateUrl: './resfacilities.component.html',
  styleUrls: ['./resfacilities.component.css']
})
export class ResfacilitiesComponent implements OnInit {

  myData: any;
  myDate = new Date();
  formattedDate = moment(this.myDate).format('MMM Do YYYY, h:mm:ss a');

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.GetListResFacilities();
    this.GetListPrices();
  }
  startTime:any = [{int: 8 , type: `8:00 am` }, {int: 9 , type: `9:00 am` }, {int: 10 , type: `10:00 am` }, {int: 11 , type: `11:00 am` }, {int: 12 , type: `12:00 pm` }, {int: 13 , type: `1:00 pm` }, {int: 14 , type: `2:00 pm` },
                  {int: 15 , type: `3:00 pm` }, {int: 16 , type: `4:00 pm` }, {int: 17, type: `5:00 pm` }, {int: 18 , type: `6:00 pm` }, {int: 19 , type: `7:00 pm` }, {int: 20 , type: `8:00 pm` }, {int: 21 , type: `9:00 pm` }];
  endTime:any = [{int: 9 , type: `9:00 am` }, {int: 10 , type: `10:00 am` }, {int: 11 , type: `11:00 am` }, {int: 12 , type: `12:00 pm` }, {int: 13 , type: `1:00 pm` }, {int: 14 , type: `2:00 pm` },
                  {int: 15 , type: `3:00 pm` }, {int: 16 , type: `4:00 pm` }, {int: 17, type: `5:00 pm` }, {int: 18 , type: `6:00 pm` }, {int: 19 , type: `7:00 pm` }, {int: 20 , type: `8:00 pm` }, {int: 21 , type: `9:00 pm` }];
  dataListResFacilities:any = [];
  addData:any = {};
  dataListPrice:any = [];
  dataArray:any =[];
  dataList:any = {}; 
  checker:any;
  checkerdate:any;
  validator: number | any;
  dRate: number | any;
  nRate: number | any;
  sTime: number | any;
  eTime: number | any;
  totaTime: number | any;
  totalPay: number | any;

  GetListResFacilities(){
    this.service.GetListResFacilities().subscribe(data=>{
      this.dataListResFacilities = (<any>data);
      console.log("reslist", this.dataListResFacilities);
      this.dataListResFacilities.forEach((item:any)=>{
        item.eventDate = moment(item.eventDate).format('MMM Do YYYY');
      })
    }) 
  }

  AddResFacilities(){
    this.dateValidator();
    console.log(this.addData);
    if(this.validator != 1){
      this.addCategoryFacilities();
      this.total();
      this.service.AddResFacilities(this.addData).subscribe(data=>{
        console.log("add", data);
        this.GetListResFacilities();
        this.addData = {};
        this.validator = 0;
      })
      console.log("valid");
    }
    else{
      console.log("exist");
      this.validator = 0;
    }
  }

  total(){
    this.sTime = this.addData.startTime;
    console.log("sTime", this.sTime);
    this.eTime = this.addData.endTime;
    this.totaTime = this.eTime - this.sTime;
    if(this.sTime<17){
      if(this.eTime>17){
        this.sTime = 17 - this.sTime;
        this.eTime = this.eTime - 17;
        let dummypay: number | any;
        dummypay = this.dRate * this.sTime;
        this.totalPay = this.nRate * this.eTime + dummypay;
        console.log("lapas alas 5", this.totalPay);
        this.totalPay = 0;
      }else{ 
        this.totalPay = this.dRate * this.totaTime;
        console.log("totalPay", this.totalPay);
        this.totalPay = 0;
      }
    }else{
      this.totalPay = this.nRate * this.totaTime;
      console.log("totalPay", this.totalPay);
      this.totalPay = 0;
    }
  }

  addCategoryFacilities(){
    this.addData.reservationDate = this.formattedDate;
    console.log("data",this.checker);
    this.dataListPrice.forEach((item: any) => {
      if(item.facilityId == this.checker ){
        this.dataArray.push(item);
        this.dataList = this.dataArray[0];
        //delete the first element in array
        this.dataArray.splice(0, this.dataArray.length);
        console.log("dataList", this.dataList);
        this.addData.facilityId = this.dataList.facilityName;
        this.addData.categoryId = this.dataList.categoryName;
        this.dRate = this.dataList.dayRperH;
        this.nRate = this.dataList.nightRperH;
      }
    });
  }

  dateValidator(){
    this.checkerdate = moment(this.addData.eventDate).format('MMM Do YYYY');
    console.log("checker1", this.dataListResFacilities);
    console.log("checker2", this.checkerdate); 
    this.dataListResFacilities.forEach((item:any) => {
      if(item.eventDate === this.checkerdate){
        console.log("exist");
        this.validator = 1;
      }
    })
  }

  GetListPrices(){
    this.service.GetListPrices().subscribe(data=>{
      this.dataListPrice = (<any>data);
      console.log("prices", data);
    }) 
  }

}
