import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { DateRange } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


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

  account :any = localStorage.getItem('account');
  compAccount: any = "admin";

  constructor(private service: SharedService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.GetListPrices();
    this.ViewListResFacilities();
    this.GetListFacilityCategories();
    this.GetClient();
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
  searchText: any;


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
  disableInputForm: boolean = false;
  isTriggerAddSched: number | any;

  dataListOthers:any = [];

  checkerOther:any ;
  rateOther:number = 0;

  dataResOther:any = {};

  dataArrayOther:any = [];
  dataArrayItem:any = [];

 
  dropdownPrice:any = [];

  clearSearch(){
    this.searchText = "";
  }

  addClient: any = {};
  staticClient: any = {};
  AddClient(){
    this.validateClient();
    if(this.clientValidator != 1){
      this.disableInputForm = true;
      this.isTriggerAddSched = 1;
      this.service.AddClient(this.addClient).subscribe(data=>{
        this.staticClient = (<any>data);
        console.log("addclient",this.staticClient);
        this.GetClient();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Your work has been saved!'
        })
        })
    }
  }

  getClient: any = [];
  GetClient(){
    this.service.GetClient().subscribe(data=>{
        this.getClient = (<any>data);
        console.log("client_get",this.getClient);
    }) 
  }

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

  done(){ 
    if(this.editData.done == null){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Done!',
            'This schedule has been completed!',
            'success'
          )
          this.editData.done = 1;
          this.service.EditResFacilities(this.editData).subscribe(data=>{
            this.clear();
            this.ViewListResFacilities();
          })
        }
      })
    }else{
      console.log("done");
    }
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
    // this.viewListReservation = [];
    this.tempreserve = [];
    this.approvedList = [];
    // this.addData = {};
    
    this.checker = "";
    this.selectedValue = "";
    this.filterListClient = [];

    this.dataList = {};
    this.dataArray = [];
    this.validator = 0;
    this.validator_2 = 0;
    this.totalTimeValidator = 0;
    this.totalTimeValidatorArray = [];
    this.sumTime = 0;
  }

  clearFields(){
    this.addData = {};
    this.addClient = {};
    this.checker = "";
    this.selectedValue = "";
    this.filterListClient = [];
    this.disableInputForm = false;
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
    // this.service.ViewListResFacilities().subscribe(data=>{
    //   this.viewListReservation = (<any>data);
    //   data.forEach((item:any) => {
    //     this.tempreserve.push({     
    //         date:item.date,
    //         endTime:item.endTime,
    //         startTime:item.startTime,
    //         facilityId:item.facilityId,
    //         status:item.status
    //     })
    //   })
    //   this.filter();
    // }) 

    this.service.ViewListResFacilities().subscribe(data=>{
      this.viewListReservation = (<any>data);
      this.filterdList();
      console.log("clientres",this.viewListReservation);
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

  filterdList(){
    console.log("check");
    console.log("checkList", this.viewListReservation);
    console.log("static", this.staticClient.clientId);
    this.viewListReservation.forEach((item : any)=>{
      if(item.clientId == this.staticClient.clientId){
        this.filterListClient.push(item);
      }
    })
    console.log("listfilter", this.filterListClient);
  }
  filterListClient: any = [];
  dataRange :number | any;
  AddResFacilities(){
    //extract the month and day only
    // const dateRange = new Date(this.addData.date);
    // this.dataRange = this.datePipe.transform(dateRange, 'MM-dd');
    // console.log("rangeDate", this.dataRange);
    this.isTriggerAddSched = 1;
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
      this.addData.clientId = this.staticClient.clientId;
      this.addData.formattedDate = moment(this.addData.date).format('MMM Do YYYY');
      this.service.AddResFacilities(this.addData).subscribe(data=>{
        this.clear();
        this.ViewListResFacilities();
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Your work has been saved!'
        })
        })
    }else{
      this.validator = 0;
      this.totalTimeValidator =0;
      this.totalTimeValidatorArray = [];
      this.sumTime =0;
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

  validateListClient:any = {};
  clientValidator : number = 0;
  validateClient(){
    this.validateListClient.clientName = this.addClient.clientName == null? true: false;
    this.validateListClient.address = this.addClient.address == null? true: false;
    this.validateListClient.contactPerson = this.addClient.contactPerson == null ? true: false;
    this.validateListClient.contactNo = this.addClient.contactNo == null ? true: false;
    this.validateListClient.emailAd = this.addClient.emailAd == null ? true: false;
    if(this.validateListClient.clientName || this.validateListClient.address || this.validateListClient.contactPerson || this.validateListClient.contactNo || this.validateListClient.emailAd){
      this.clientValidator = 1;
    }
  }


  GetListPrices(){
    this.service.GetListPrices().subscribe(data=>{
      this.dataListPrice = (<any>data);
    }) 
  }

}
