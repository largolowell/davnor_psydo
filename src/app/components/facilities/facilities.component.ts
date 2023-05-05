import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.css']
})
export class FacilitiesComponent implements OnInit {

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.GetListFacilities();
    this.GetListFacilityCategories();
    this.GetListPrices();
  }

  dataListFacilities:any = [];
  dataListFacilityCategories:any = [];
  dataListPrice:any = [];
  dataItem:any = {}; 
  addData:any = {};

  AddFacilities(){
    this.service.AddFacilities(this.addData).subscribe(data=>{
      console.log("add_facilities", data);
      this.clear();
      this.GetListPrices();
    })
  }

  clear(){
    this.dataListFacilities= [];
    this.dataListFacilityCategories= [];
    this.dataListPrice = [];
    this.dataItem ={}; 
    this.addData = {};
    this.finalList = [];
  }

  GetListFacilities(){
    this.service.GetListFacilities().subscribe(data=>{
      this.dataListFacilities = (<any>data);
      console.log("facility", data);
    }) 
  }
  finalList:any = [];
  GetListPrices(){
    this.service.GetListPrices().subscribe(data=>{
      this.dataListPrice = (<any>data);
      console.log("prices", data);
      this.dataListPrice.forEach((item:any)=>{
        if(item.categoryId != "C230425161142"){
          this.finalList.push(item);
        }
      })
      console.log("finallist", this.finalList);
    }) 
  }

  GetListFacilityCategories(){
    this.service.GetListFacilityCategories().subscribe(data=>{
      this.dataListFacilityCategories = (<any>data);
      console.log("facilityCategories", data);
    }) 
  }


}
