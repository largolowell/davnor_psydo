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
  }

  dataList:any = [];
  addData:any = {};

  GetListDavNorGym(){
    this.service.GetListDavNorGym().subscribe(data=>{
      this.dataList = (<any>data);
      console.log("gym", data);
    }) 
  }

  AddDavNorGym(){
    this.addData.categoryName = "DavNorGym";
    this.service.AddDavNorGym(this.addData).subscribe(data=>{
      console.log("add_davnorgym", data); 
      this.GetListDavNorGym();
    })
  }
 
}
