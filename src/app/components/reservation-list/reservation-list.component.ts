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

  // display:any = []

  viewListReservation:any = [];
  ViewListResFacilities(){
    this.service.ViewListResFacilities().subscribe(data=>{
      this.viewListReservation = (<any>data);
      console.log("viewlistres", this.viewListReservation);
      this.filter();
    }) 
  }

  // selectedStatus:any;
  // onSelectChange(event:any) {
  //   console.log(event);
  //   if(event == 1){
  //     this.display = this.approvedList;
  //   }else{
  //     this.display = this.declinedList;
  //   }
  // }

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
    console.log("editdata", this.editData);
    this.editData.status = 1;
     this.service.EditResFacilities(this.editData).subscribe(data=>{
       console.log("edited", data); 
       this.approvedList = [];
       this.declinedList = [];
       this.reservedList = [];
       this.ViewListResFacilities();
     })
  }

  decline(){
    console.log("editdata", this.editData);
    this.editData.status = -1;
     this.service.EditResFacilities(this.editData).subscribe(data=>{
       console.log("edited", data); 
       this.approvedList = [];
       this.declinedList = [];
       this.reservedList = [];
       this.ViewListResFacilities();
     })
  }

}
