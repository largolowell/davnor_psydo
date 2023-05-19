import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private elementRef: ElementRef, private service: SharedService) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.GetListResFacilities();
  }

  dataListResFacilities:any = [];
  GetListResFacilities(){
    this.service.ViewListResFacilities().subscribe(data=>{
      this.dataListResFacilities = (<any>data);
      this.filter();
      this.finalStep();
    }) 
  }

  approvedList:any = [];
  filter(){
    this.dataListResFacilities.forEach((item : any)=>{
      if(item.status === 1){
        this.approvedList.push(item);
      }
    })
  }
  davnorgymCounter: number =0 ;
  stComplexCounter:number = 0;
  clubhouseCounter:number = 0;
  outsideCounter: number = 0;
  swimmingCounter: number = 0;
  footballCounter: number = 0;
  ovalCounter: number = 0;
  finalStep(){
    this.approvedList.forEach((item:any)=>{
      if(item.categoryId === "C230425161142"){
        this.davnorgymCounter ++;
      }
      if(item.categoryId === "C230425092351"){
        this.stComplexCounter ++;
      }
      if(item.categoryId === "C230425092314"){
        this.clubhouseCounter ++;
      }
      if(item.categoryId === "C230425092226"){
        this.outsideCounter ++;
      }
      if(item.categoryId === "C230425092213"){
        this.swimmingCounter ++;
      }
      if(item.categoryId === "C230425092153"){
        this.footballCounter ++;
      }
      if(item.categoryId === "C230425092142"){
        this.ovalCounter ++;
      }
    })
  }


}
