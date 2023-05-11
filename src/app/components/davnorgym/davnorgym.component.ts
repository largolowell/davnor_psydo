import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-davnorgym',
  templateUrl: './davnorgym.component.html',
  styleUrls: ['./davnorgym.component.css']
})
export class DavnorgymComponent implements OnInit {

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.GetListDavNorGym();
    this.GetListOther();
  }

  dataList:any = [];
  dataListOthers:any = [];
  addData:any = {};
  addDataOthers:any = {};

  finalList:any = [];

  temp:any;
  purpose:any;

  GetListDavNorGym(){
    this.service.GetListPrices().subscribe(data=>{
      this.dataList = (<any>data);
      this.dataList.forEach((item:any)=>{
        if(item.categoryId === "C230425161142"){
          this.finalList.push(item);
        }
      })
    }) 
  }

  clear(){
    this.dataList = [];
    this.dataListOthers = [];
    this.addData = {};
    this.addDataOthers = {};
    this.finalList = [];
  }

  GetListOther(){
    this.service.GetListOther().subscribe(data=>{
      this.dataListOthers = (<any>data);
    }) 
  }

  AddDavNorGym(){
    let result = this.purpose + " " + this.temp;
    this.addData.facilityName = result;
    this.addData.categoryId = "C230425161142";
    this.service.AddFacilities(this.addData).subscribe(data=>{
      this.clear();
      this.GetListDavNorGym();
    })
  }

  AddOthers(){
    this.service.AddOthers(this.addDataOthers).subscribe(data=>{
      this.GetListOther();
    })
  }
 
}
