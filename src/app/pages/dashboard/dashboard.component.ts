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
  davnorgymCounter_res: number =0 ;
  totalCounter_davnorgym:number = 0
  davnorgymCounter_done: number =0 ;

  stComplexCounter_res:number = 0;
  totalCounter_stComplex:number = 0
  stComplexCounter_done:number = 0;

  clubhouseCounter_res:number = 0;
  totalCounter_clubhouse:number = 0
  clubhouseCounter_done:number = 0;

  outsideCounter_res: number = 0;
  totalCounter_outside:number = 0
  outsideCounter_done: number = 0;

  swimmingCounter_res: number = 0;
  totalCounter_swimming:number = 0
  swimmingCounter_done: number = 0;

  footballCounter_res: number = 0;
  totalCounter_football:number = 0
  footballCounter_done: number = 0;

  ovalCounter_res: number = 0;
  totalCounter_oval:number = 0
  ovalCounter_done:number = 0;
  finalStep(){
    this.approvedList.forEach((item:any)=>{
      if(item.categoryId === "C230425161142"){
        this.totalCounter_davnorgym ++;
        if(item.done == 1){
          this.davnorgymCounter_done ++;
        }else{
          this.davnorgymCounter_res ++;
        }
      }
      if(item.categoryId === "C230425092351"){
        this.totalCounter_stComplex ++;
        if(item.done == 1){
          this.stComplexCounter_done ++;
        }else{
          this.stComplexCounter_res ++;
        }
      }
      if(item.categoryId === "C230425092314"){
        this.totalCounter_clubhouse ++;
        if(item.done == 1){
          this.clubhouseCounter_done ++;
        }else{
          this.clubhouseCounter_res ++;
        }
      }
      if(item.categoryId === "C230425092226"){
        this.totalCounter_outside ++;
        if(item.done == 1){
          this.outsideCounter_done ++;
        }else{
          this.outsideCounter_res ++;
        }
      }
      if(item.categoryId === "C230425092213"){
        this.totalCounter_swimming ++;
        if(item.done == 1){
          this.swimmingCounter_done ++;
        }else{
          this.swimmingCounter_res ++;
        }
      }
      if(item.categoryId === "C230425092153"){
        this.totalCounter_football ++;
        if(item.done == 1){
          this.footballCounter_done ++;
        }else{
          this.footballCounter_res ++;
        }
      }
      if(item.categoryId === "C230425092142"){
        this.totalCounter_oval ++;
        if(item.done == 1){
          this.ovalCounter_done ++;
        }else{
          this.ovalCounter_res ++;
        }
      }
    })
  }


}
