import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import * as moment from 'moment';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.ViewListResFacilities();
  
  }
  approvedList: any = [];
  declinedList: any = [];
  reservedList:any = [];

  validator:any;

  viewListReservation:any = [];
  ViewListResFacilities(){
    this.service.ViewListResFacilities().subscribe(data=>{
      this.viewListReservation = (<any>data);
      console.log("viewlistres", this.viewListReservation);
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

  filter(){
    console.log("viewlistres_check", this.viewListReservation );
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
    console.log("check1",this.approvedList);
    console.log("check2",this.declinedList);
    console.log("check3",this.reservedList);
  }

  editData:any = {};
  approve(){
    this.dateValidator();
    if(this.validator != 1){
      console.log("editdata", this.editData);
      this.editData.status = 1;
       this.service.EditResFacilities(this.editData).subscribe(data=>{
         console.log("edited", data); 
         this.approvedList = [];   
         this.declinedList = [];
         this.reservedList = [];
         this.ViewListResFacilities();
         Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
       })
    }else{
      console.log("exist");
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
        console.log("editdata", this.editData);
        this.editData.status = -1;
         this.service.EditResFacilities(this.editData).subscribe(data=>{
           console.log("edited", data); 
           this.approvedList = [];
           this.declinedList = [];
           this.reservedList = [];
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

}
