import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-resfacilities',
  templateUrl: './resfacilities.component.html',
  styleUrls: ['./resfacilities.component.css']
})
export class ResfacilitiesComponent implements OnInit {

  validate:any = {};
  myData: any;
  myDate = new Date();
  formattedDate = moment(this.myDate).format('MMM Do YYYY, h:mm:ss a');

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    // this.GetListResFacilities();
    this.GetListPrices();
    // this.GetListDavNorGym();
    this.GetListOther();
    this.ViewListResFacilities();
    this.GetListFacilityCategories();
  }

  startTime:any = [{int: 8 , type: `8:00 AM` }, {int: 9 , type: `9:00 AM` }, {int: 10 , type: `10:00 AM` }, {int: 11 , type: `11:00 AM` }, {int: 12 , type: `12:00 PM` }, {int: 13 , type: `1:00 PM` }, {int: 14 , type: `2:00 PM` },
                  {int: 15 , type: `3:00 PM` }, {int: 16 , type: `4:00 PM` }, {int: 17, type: `5:00 PM` }, {int: 18 , type: `6:00 PM` }, {int: 19 , type: `7:00 PM` }, {int: 20 , type: `8:00 PM` }, {int: 21 , type: `9:00 PM` }];
  endTime:any = [{int: 9 , type: `9:00 AM` }, {int: 10 , type: `10:00 AM` }, {int: 11 , type: `11:00 AM` }, {int: 12 , type: `12:00 PM` }, {int: 13 , type: `1:00 PM` }, {int: 14 , type: `2:00 PM` },
                  {int: 15 , type: `3:00 PM` }, {int: 16 , type: `4:00 PM` }, {int: 17, type: `5:00 PM` }, {int: 18 , type: `6:00 PM` }, {int: 19 , type: `7:00 PM` }, {int: 20 , type: `8:00 PM` }, {int: 21 , type: `9:00 PM` }];
  // dataListResFacilities:any = [];
  addData:any = {};
  editData:any = {};
  dataListPrice:any = [];
  dataArray:any =[];
  dataList:any = {}; 
  checker:any;

  selectedValue: any;
  // checkedValueElectronic: boolean = false;
  // checkedValueSound: boolean = false;
 
  // checkerdate:any;
  validator: number | any;
  dRate: number | any;
  nRate: number | any;
  sTime: number | any;
  eTime: number | any;
  totalTime: number | any;
  totalPay: number | any;

  // facilities: boolean = false;
  purpose: boolean = false;

  // dataListDavGym:any = [];
  dataListOthers:any = [];

  checkerOther:any ;
  rateOther:number = 0;

  dataResOther:any = {};
  // dataResGym:any = {};

  dataArrayOther:any = [];
  dataArrayItem:any = [];

  // rate:number | any;  
 
  dropdownPrice:any = [];
  onSelectChange(event:any) {
    console.log("selectedValue",event);
    this.dropdownPrice = [];
    // if(event == "option1"){
    //   this.facilities = true;
    //   this.purpose = false;
    // }
    // else{
    //   this.purpose = true;
    //   this.facilities = false;
    // }
    this.dataListPrice.forEach((item: any) =>{
      if(item.categoryId == event){ 
        this.dropdownPrice.push(item);
      }
    })
  }
  EditResFacilities(){
    console.log("editdata",this.editData);
    this.service.EditResFacilities(this.editData).subscribe(data=>{
      console.log("edited", data); 
    })

  }

  addOthers(){
    this.dataListOthers.forEach((item: any) =>{
      if(item.othersId == this.checkerOther){ 
        this.dataArrayOther.push(item);
        this.dataResOther = this.dataArrayOther[0];
        //delete the first element in array
        this.dataArrayOther.splice(0, this.dataArrayOther.length);
        // this.addData.otherItem = this.dataResOther.otherItem;
        this.dataArrayItem.push(this.dataResOther.otherItem);
        const combinedData = this.dataArrayItem.join(', ');
        this.addData.otherItem = combinedData;
        this.rateOther = this.dataResOther.rate + this.rateOther;
        console.log("other rate", this.rateOther);
        console.log("other rate", combinedData);
      }
    })
    // if(this.checkedValueElectronic){

    // }
    // if(this.checkedValueSound){

    // }
  }
 
  listfacilitycategory:any = [];
  GetListFacilityCategories(){
    this.service.GetListFacilityCategories().subscribe(data=>{
      this.listfacilitycategory = (<any>data);
      console.log("listfacilitycategory", data);
    }) 
  }
  viewListReservation:any = [];
  ViewListResFacilities(){
    this.service.ViewListResFacilities().subscribe(data=>{
      this.viewListReservation = (<any>data);
      console.log("viewlistres", data);
    }) 
  }

  GetListOther(){
    this.service.GetListOther().subscribe(data=>{
      this.dataListOthers = (<any>data);
      console.log("other", data);
    }) 
  }

  // GetListDavNorGym(){
  //   this.service.GetListDavNorGym().subscribe(data=>{
  //     this.dataListDavGym = (<any>data);
  //     console.log("list", data); 
  //   }) 
  // }


  // GetListResFacilities(){
  //   this.service.GetListResFacilities().subscribe(data=>{
  //     this.dataListResFacilities = (<any>data);
  //     console.log("reslist", this.dataListResFacilities);
  //     // this.dataListResFacilities.forEach((item:any)=>{
  //     //   item.eventDate = moment(item.eventDate).format('MMM Do YYYY');
  //     // })
  //   }) 
  // }

  AddResFacilities(){
    // this.addCategoryFacilities();
    // this.total();
    // console.log("checktotalhere", this.addData.total);
    this.validateInput();
    this.dateValidator();
    console.log("checkthelist",this.addData);
    if(this.validator != 1){
      this.addCategoryFacilities();
      if(this.selectedValue === "C230425161142"){
        this.totalPurpose();
      }else{
        this.total();
      }
      this.service.AddResFacilities(this.addData).subscribe(data=>{
        console.log("add", data);
        this.ViewListResFacilities();
        this.addData = {};
        this.dataList = {};
        this.dataArray = [];
        this.validator = 0;
        })
    }else{
      console.log("exist");
      this.validator = 0;
    }
  }  

  total(){
    this.sTime = this.addData.startTime;
    console.log("sTime", this.sTime);
    this.eTime = this.addData.endTime;
    this.totalTime = this.eTime - this.sTime;
    if(this.sTime<17){
      if(this.eTime>17){
        this.sTime = 17 - this.sTime;
        this.eTime = this.eTime - 17;
        let dummypay: number | any;
        dummypay = this.dRate * this.sTime;
        this.totalPay = this.nRate * this.eTime + dummypay;
        console.log("lapas alas 5", this.totalPay);
        this.addData.total = this.totalPay;
        this.totalPay = 0;
      }else{ 
        this.totalPay = this.dRate * this.totalTime;
        console.log("totalPay", this.totalPay);
        this.addData.total = this.totalPay;
        this.totalPay = 0;
      }
    }else{
      this.totalPay = this.nRate * this.totalTime;
      console.log("totalPay", this.totalPay);
      this.addData.total = this.totalPay; 
      this.totalPay = 0;
    }
    console.log("checktotalhere", this.addData.total);
  }

  totalPurpose(){
    this.sTime = this.addData.startTime;
    this.eTime = this.addData.endTime;
    this.totalTime = this.eTime - this.sTime;
    this.addData.total = this.dRate * this.totalTime + (this.rateOther * this.totalTime);
  }

  addCategoryFacilities(){
    this.addData.reservationDate = this.formattedDate;
    console.log("data",this.checker); 
    console.log("prices",this.dataListPrice);
    this.dataListPrice.forEach((item: any) => {
      if(item.facilityId == this.checker ){
        this.dataArray.push(item);
        this.dataList = this.dataArray[0];
        console.log("addcategorydatalist", this.dataList);
        //delete the first element in array
        this.dataArray.splice(0, this.dataArray.length);
        console.log("dataList", this.dataList);
        this.addData.facilityId = this.dataList.facilityId;
        // if(this.selectedValue === "C230425161142"){

        // }
        // this.addData.categoryId = this.dataList.categoryId;
        // this.addData.facilityName = this.dataList.facilityName;
        // this.addData.categoryName = this.dataList.categoryName;
        this.dRate = this.dataList.dayRperH;
        this.nRate = this.dataList.nightRperH;  
      }
    });
  }

  // addPurpose(){ 
  //   this.addData.reservationDate = this.formattedDate;
  //   console.log("data",this.checker);
  //   this.dataListDavGym.forEach((item: any) => {
  //     if(item.facilityId == this.checker ){
  //       this.dataArray.push(item);
  //       this.dataResGym = this.dataArray[0];
  //       //delete the first element in array
  //       this.dataArray.splice(0, this.dataArray.length);
  //       console.log("dataList", this.dataResGym);
  //       this.addData.categoryName = this.dataResGym.categoryId;
  //       this.addData.purposeId = this.dataResGym.facilityId;
  //       this.addData.purpose = this.dataResGym.purpose;
  //       this.rate = this.dataResGym.rate;
  //     }   
  //   });
  // }

  dateValidator(){
    // this.checkerdate = moment(this.addData.eventDate).format('MMM Do YYYY');
    console.log("checker1", this.viewListReservation);
    console.log("checker2", this.addData.date); 
    this.viewListReservation.forEach((item:any) => {
      if(item.date === this.addData.date){
        console.log("exist");
        this.validator = 1;
      }
    })
  }

  validateInput(){
    this.validate.selectedValue = this.selectedValue == null? true: false;
    // this.validate.purpose = this.checker == null ? true: false;
    this.validate.facilityId = this.checker == null ? true: false;
    this.validate.date = this.addData.date == null ? true: false;
    this.validate.startTime = this.addData.startTime == null ? true: false;
    this.validate.endTime = this.addData.endTime == null ? true: false;
    if(this.validate.facilityId || this.validate.date || this.validate.startTime || this.validate.endTime){
      console.log("need input");
      this.validator = 1;
    }
  }


  GetListPrices(){
    this.service.GetListPrices().subscribe(data=>{
      this.dataListPrice = (<any>data);
      console.log("prices", data);
    }) 
  }

}
