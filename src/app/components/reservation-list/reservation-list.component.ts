import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { B } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.ViewListResFacilities();
    this.GetListPrices();
  }

  startTime:any = [{int: 8 , type: `8:00 AM` }, {int: 9 , type: `9:00 AM` }, {int: 10 , type: `10:00 AM` }, {int: 11 , type: `11:00 AM` }, {int: 12 , type: `12:00 PM` }, {int: 13 , type: `1:00 PM` }, {int: 14 , type: `2:00 PM` },
  {int: 15 , type: `3:00 PM` }, {int: 16 , type: `4:00 PM` }, {int: 17, type: `5:00 PM` }, {int: 18 , type: `6:00 PM` }, {int: 19 , type: `7:00 PM` }, {int: 20 , type: `8:00 PM` }, {int: 21 , type: `9:00 PM` }];
  endTime:any = [{int: 9 , type: `9:00 AM` }, {int: 10 , type: `10:00 AM` }, {int: 11 , type: `11:00 AM` }, {int: 12 , type: `12:00 PM` }, {int: 13 , type: `1:00 PM` }, {int: 14 , type: `2:00 PM` },
  {int: 15 , type: `3:00 PM` }, {int: 16 , type: `4:00 PM` }, {int: 17, type: `5:00 PM` }, {int: 18 , type: `6:00 PM` }, {int: 19 , type: `7:00 PM` }, {int: 20 , type: `8:00 PM` }, {int: 21 , type: `9:00 PM` }];

  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void; }; };

  @ViewChild('closebuttonedit')
  closebuttonedit!: { nativeElement: { click: () => void; }; };

  @ViewChild('closebuttonpaid')
  closebuttonpaid!: { nativeElement: { click: () => void; }; };

  myDate = new Date();
  formattedDate = moment(this.myDate).format('MMM Do YYYY');

  approvedList: any = [];
  declinedList: any = [];
  reservedList:any = [];

  validator:any;

  viewListReservation:any = [];

  ViewListResFacilities(){
    this.service.ViewListResFacilities().subscribe(data=>{
      this.viewListReservation = (<any>data);
      this.filter();
    }) 
  }

  dateValidator(){
    this.approvedList.forEach((item:any)=>{
      if(item.date ===this.editData.date &&item.facilityId === this.editData.facilityId){
        this.validator = 1
      }
    })
  }

  selectedValue :any = 1;
  
  storage: number |any;
  isRegular: boolean = true;
  isDonation: boolean = false;
  onSelectChange(event:any) {
    if(event === "1"){
      this.editData.total = this.storage;
      this.isRegular = true;
      this.isDonation = false;
    }
    if(event === "2"){
      this.isRegular = true;
      this.isDonation = false;
      this.editData.total = 0;
      this.editData.remarks = "Free of use";
    }
    if(event === "3"){
      this.isRegular = false;
      this.isDonation = true;
      this.editData.total = 0;
      this.editData.remarks = "Donation";
    }
  }

 
  isNotShow:boolean = false;
  filter(){
    this.viewListReservation.forEach((item : any)=>{
      if(item.status === 1){
        this.approvedList.push(item);
      }
      if(item.status === -1){
        this.declinedList.push(item);
      }
      if(item.status === null){
        this.reservedList.push(item);
      }
    })
    let i = 0;
    while(i<this.approvedList.length){
      if(this.approvedList[0].paid === -1 || null){
        this.isNotShow = false;
        break;
      }else{
        this.isNotShow = true;
        i++;
      }
    }
  }

  clear(){
    this.approvedList = [];   
    this.declinedList = [];
    this.reservedList = [];
    this.viewListReservation = [];

    this.dataList = {};
    this.dataArray = [];
    this.validator = 0;
  }

  paid(){
    this.editData.paid = 1;
    this.service.EditResFacilities(this.editData).subscribe(data=>{
      this.clear();
      this.ViewListResFacilities();
      this.closebuttonpaid.nativeElement.click();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Paid',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  due(){
    this.editData.paid = -1;
    this.service.EditResFacilities(this.editData).subscribe(data=>{
      this.clear();
      this.ViewListResFacilities();
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Due for collection',
        showConfirmButton: false,
        timer: 2000
      })
    })
  }

  editData:any = {};
  approve(){
    this.dateValidator();
    if(this.validator != 1){
      if(this.editData.total === this.storage){
        this.editData.remarks = "Regular payment";
      }
      this.editData.status = 1;
      this.editData.approvedDate = this.formattedDate;
       this.service.EditResFacilities(this.editData).subscribe(data=>{
        this.clear();
         this.ViewListResFacilities();
         this.closebutton.nativeElement.click();
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
       })
    }else{
      this.validator = 0;
      Swal.fire({
        icon: 'warning',
        title: 'Schedule Conflict'
      })
    }
  }

  decline(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, decline it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.editData.status = -1;
         this.service.EditResFacilities(this.editData).subscribe(data=>{
          this.clear();
           this.ViewListResFacilities();
         })
        Swal.fire(
          'Decline!',
          'The request has been declined.',
          'success'
        )
      }
    })
  }


  EditResFacilities(){
      this.editCategoryFacilities();
      if(this.editData.facilityId === "C230425161142"){
        this.totalPurpose();
      }else{
        this.total();
      }
      this.editData.formattedDate = moment(this.editData.date).format('MMM Do YYYY');
      this.service.EditResFacilities(this.editData).subscribe(data=>{
        this.closebuttonedit.nativeElement.click();
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
  }

  sTime: number | any;
  eTime: number | any;
  totalTime: number | any;
  totalPay: number | any;
  rateOther:number = 0;
  total(){
    this.sTime = this.editData.startTime;
    this.eTime = this.editData.endTime;
    this.totalTime = this.eTime - this.sTime;
    if(this.sTime<17){
      if(this.eTime>17){
        this.sTime = 17 - this.sTime;
        this.eTime = this.eTime - 17;
        let dummypay: number | any;
        dummypay = this.dRate * this.sTime;
        this.totalPay = this.nRate * this.eTime + dummypay;
        this.editData.total = this.totalPay;
        this.totalPay = 0;
      }else{ 
        this.totalPay = this.dRate * this.totalTime;
        this.editData.total = this.totalPay;
        this.totalPay = 0;
      }
    }else{
      this.totalPay = this.nRate * this.totalTime;
      this.editData.total = this.totalPay;
      this.totalPay = 0;
    }
  }

  totalPurpose(){
    this.sTime = this.editData.startTime;
    this.eTime = this.editData.endTime;
    this.totalTime = this.eTime - this.sTime;
    this.editData.total = this.dRate * this.totalTime + (this.rateOther * this.totalTime);
  }





  dataListPrice:any = [];
  dataArray:any =[];
  dataList:any = {}; 
  dRate: number | any;
  nRate: number | any;
  editCategoryFacilities(){
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

  GetListPrices(){
    this.service.GetListPrices().subscribe(data=>{
      this.dataListPrice = (<any>data);
    }) 
  }

}
