import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'


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
    this.GetListPrices();
    this.ViewListResFacilities();
    this.GetListFacilityCategories();
  }

  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void; }; };

  startTime:any = [{int: 8 , type: `8:00 AM` }, {int: 9 , type: `9:00 AM` }, {int: 10 , type: `10:00 AM` }, {int: 11 , type: `11:00 AM` }, {int: 12 , type: `12:00 PM` }, {int: 13 , type: `1:00 PM` }, {int: 14 , type: `2:00 PM` },
                  {int: 15 , type: `3:00 PM` }, {int: 16 , type: `4:00 PM` }, {int: 17, type: `5:00 PM` }, {int: 18 , type: `6:00 PM` }, {int: 19 , type: `7:00 PM` }, {int: 20 , type: `8:00 PM` }, {int: 21 , type: `9:00 PM` }];
  endTime:any = [{int: 9 , type: `9:00 AM` }, {int: 10 , type: `10:00 AM` }, {int: 11 , type: `11:00 AM` }, {int: 12 , type: `12:00 PM` }, {int: 13 , type: `1:00 PM` }, {int: 14 , type: `2:00 PM` },
                  {int: 15 , type: `3:00 PM` }, {int: 16 , type: `4:00 PM` }, {int: 17, type: `5:00 PM` }, {int: 18 , type: `6:00 PM` }, {int: 19 , type: `7:00 PM` }, {int: 20 , type: `8:00 PM` }, {int: 21 , type: `9:00 PM` }];
  addData:any = {};
  editData:any = {};
  temp:any = {};
  dataListPrice:any = [];
  dataArray:any =[];
  dataList:any = {}; 
  checker:any;

  selectedValue: any;

  validator: number | any;
  validator_2: number | any;
  dRate: number | any;
  nRate: number | any;
  sTime: number | any;
  eTime: number | any;
  totalTime: number | any;
  totalPay: number | any;

  facilities: boolean = false;
  purpose: boolean = false;

  dataListOthers:any = [];

  checkerOther:any ;
  rateOther:number = 0;

  dataResOther:any = {};

  dataArrayOther:any = [];
  dataArrayItem:any = [];

 
  dropdownPrice:any = [];

  onSelectChange(event:any) {
    this.dropdownPrice = [];
    this.dataListPrice.forEach((item: any) =>{
      if(item.categoryId == event){ 
        this.dropdownPrice.push(item);
        if(event === "C230425161142"){
          this.purpose=true;
        }
        else{
          this.purpose=false;
        }
      }
    })
  }
  EditResFacilities(){
      this.editValidator();
      if(this.validator_2 != 1){
        this.editCategoryFacilities();
        if(this.editData.facilityId === "C230425161142"){
          this.totalPurpose();
        }else{
          this.total();
        }
        this.editData.formattedDate = moment(this.editData.date).format('MMM Do YYYY');
        this.service.EditResFacilities(this.editData).subscribe(data=>{
          this.closebutton.nativeElement.click();
          this.clear();
          this.ViewListResFacilities();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2000
          })
        })
      }else{
        this.validator_2 = 0;
        this.totalTimeValidator =0;
        this.totalTimeValidatorArray = [];
        this.sumTime =0;
        Swal.fire({
          icon: 'warning',
          title: 'Invalid!'
        })
      }

  }
  clear(){
    this.viewListReservation = [];
    this.tempreserve = [];
    this.approvedList = [];
    this.addData = {};
    this.dataList = {};
    this.dataArray = [];
    this.validator = 0;
    this.validator_2 = 0;
    this.totalTimeValidator = 0;
    this.totalTimeValidatorArray = [];
    this.sumTime = 0;
  }
 
 
  DeleteResFacilities(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Canceled!',
          'The schedule has been canceled.',
          'success'
        )
        this.editData.status = -1;
        this.service.EditResFacilities(this.editData).subscribe(data=>{
          this.clear();
          this.ViewListResFacilities();
        })
      }
    })

  }
  isCheckScoreboard: boolean = false;
  isCheckSound: boolean = false;
  rateScoreboard:number = 0;
  rateSound:number = 0;
  textScoreboard: any ;
  textSound: any ;
  addOthers(){
    this.rateScoreboard = 0;
    this.rateSound = 0;
    if(this.isCheckScoreboard){
      this.rateScoreboard = 300;
      this.textScoreboard = "Electronic Scoreboard";
      this.dataArrayOther.push(this.textScoreboard);
    }

    if(this.isCheckSound){
      this.rateSound = 200;
      this.textSound = "Sound System";
      this.dataArrayOther.push(this.textSound);
    }
    const combinedData = this.dataArrayOther.join(', ');
    this.addData.othersId = combinedData;
    this.dataArrayOther = [];
    this.rateOther = this.rateScoreboard + this.rateSound;
  }
 
  listfacilitycategory:any = [];
  GetListFacilityCategories(){
    this.service.GetListFacilityCategories().subscribe(data=>{
        this.listfacilitycategory = (<any>data);
    }) 
  }
  viewListReservation:any = [];
  tempreserve:any = [];
  ViewListResFacilities(){
    this.service.ViewListResFacilities().subscribe(data=>{
      this.viewListReservation = (<any>data);
      data.forEach((item:any) => {
        this.tempreserve.push({     
            date:item.date,
            endTime:item.endTime,
            startTime:item.startTime,
            facilityId:item.facilityId,
            status:item.status
        })
      })
      this.filter();
    }) 
  }
  approvedList: any = [];

  filter(){
    this.viewListReservation.forEach((item : any)=>{
      if(item.status === 1){
        this.approvedList.push(item);
      }
    })
  }


  AddResFacilities(){
    this.addOthers();
    this.validateInput();
    this.dateValidator();
    if(this.validator != 1){
      this.addCategoryFacilities();
      if(this.selectedValue === "C230425161142"){
        this.totalPurpose();
      }else{
        this.total();
      }
      this.addData.formattedDate = moment(this.addData.date).format('MMM Do YYYY');
      this.service.AddResFacilities(this.addData).subscribe(data=>{
        this.clear();
        this.ViewListResFacilities();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 2000
        })
        })
    }else{
      this.validator = 0;
      this.totalTimeValidator =0;
      this.totalTimeValidatorArray = [];
      this.sumTime =0;
      Swal.fire({
        icon: 'warning',
        title: 'Invalid!'
      })
    } 
  }  

  total(){
    this.sTime = this.addData.startTime || this.editData.startTime;
    this.eTime = this.addData.endTime || this.editData.endTime;
    this.totalTime = this.eTime - this.sTime;
    if(this.sTime<17){
      if(this.eTime>17){
        this.sTime = 17 - this.sTime;
        this.eTime = this.eTime - 17;
        let dummypay: number | any;
        dummypay = this.dRate * this.sTime;
        this.totalPay = this.nRate * this.eTime + dummypay;
        this.addData.total = this.totalPay;
        this.editData.total = this.totalPay;
        this.totalPay = 0;
      }else{ 
        this.totalPay = this.dRate * this.totalTime;
        this.addData.total = this.totalPay;
        this.editData.total = this.totalPay;
        this.totalPay = 0;
      }
    }else{
      this.totalPay = this.nRate * this.totalTime;
      this.addData.total = this.totalPay; 
      this.editData.total = this.totalPay;
      this.totalPay = 0;
    }
  }

  totalPurpose(){
    this.addOthers();
    this.sTime = this.addData.startTime || this.editData.startTime;
    this.eTime = this.addData.endTime || this.editData.endTime;
    this.totalTime = this.eTime - this.sTime;
    this.addData.total = this.dRate * this.totalTime + (this.rateOther * this.totalTime);
    this.editData.total = this.dRate * this.totalTime + (this.rateOther * this.totalTime);
  }

  addCategoryFacilities(){
    this.addData.reservationDate = this.formattedDate;
    this.dataListPrice.forEach((item: any) => {
      if(item.facilityId == this.checker ){
        this.dataArray.push(item);
        this.dataList = this.dataArray[0];
        //delete the first element in array
        this.dataArray.splice(0, this.dataArray.length);
        this.addData.facilityId = this.dataList.facilityId;
        this.dRate = this.dataList.dayRperH;
        this.nRate = this.dataList.nightRperH;  
      }
    });
  }

  editCategoryFacilities(){
    this.editData.reservationDate = this.formattedDate;
    this.dataListPrice.forEach((item: any) => { 
      if(item.facilityId == this.editData.facilityId ){
        this.dataArray.push(item);
        this.dataList = this.dataArray[0];
        //delete the first element in array
        this.dataArray.splice(0, this.dataArray.length);
        this.editData.facilityId = this.dataList.facilityId;
        this.dRate = this.dataList.dayRperH;
        this.nRate = this.dataList.nightRperH;  
      }
    });
  }

  totalTimeValidator: number =0;
  totalTimeValidatorArray:any = [];
  sumTime:number =0;
  dateValidator(){
    this.approvedList.forEach((item:any) => {
      if(item.date === this.addData.date && item.facilityId === this.checker){
        this.validator = 1;
      }
    })
  }

  editValidator(){   
    this.tempreserve.forEach((item:any) => {
      if(item.date === this.temp.date && item.facilityId === this.temp.facilityId && item.status === 1){
        if(this.temp.startTime != item.startTime || this.temp.endTime != item.endTime){
          console.log("proceed");
          this.validator = 0;
        }
        else{
          this.validator_2 = 1;
        }

      }
    })
  }

  validateInput(){
    this.validate.title = this.addData.title == null? true: false;
    this.validate.selectedValue = this.selectedValue == null? true: false;
    this.validate.facilityId = this.checker == null ? true: false;
    this.validate.date = this.addData.date == null ? true: false;
    this.validate.startTime = this.addData.startTime == null ? true: false;
    this.validate.endTime = this.addData.endTime == null ? true: false;
    if(this.validate.facilityId || this.validate.date || this.validate.startTime || this.validate.endTime){
      this.validator = 1;
    }
  }


  GetListPrices(){
    this.service.GetListPrices().subscribe(data=>{
      this.dataListPrice = (<any>data);
    }) 
  }

}
