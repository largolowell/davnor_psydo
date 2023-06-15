import { Component, OnInit, ElementRef } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private elementRef: ElementRef, private service: SharedService) {}

  ngOnInit(): void {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
    this.GetListResFacilities();
  }

  dataListResFacilities: any = [];
  GetListResFacilities() {
    this.service.ViewListResFacilities().subscribe((data) => {
      this.dataListResFacilities = <any>data;
      // this.filter();
      this.finalStep();
    });
  }

  approvedList: any = [];
  filter() {
    this.dataListResFacilities.forEach((item: any) => {
      if (item.status === 1) {
        this.approvedList.push(item);
      }
    });
  }

  ovalPending: number = 0;
  ovalApprove: number = 0;
  ovalCancel: number = 0;

  footPending: number = 0;
  footApprove: number = 0;
  footCancel: number = 0;

  swimPending: number = 0;
  swimApprove: number = 0;
  swimCancel: number = 0;

  outPending: number = 0;
  outApprove: number = 0;
  outCancel: number = 0;

  trainPending: number = 0;
  trainApprove: number = 0;
  trainCancel: number = 0;

  clubPending: number = 0;
  clubApprove: number = 0;
  clubCancel: number = 0;

  pavPending: number = 0;
  pavApprove: number = 0;
  pavCancel: number = 0;

  davgymPending: number = 0;
  davgymApprove: number = 0;
  davgymCancel: number = 0;

  entiresportscomplexPending: number = 0;
  entiresportscomplexApprove: number = 0;
  entiresportscomplexCancel: number = 0;

  davcolPending: number = 0;
  davcolApprove: number = 0;
  davcolCancel: number = 0;

  davtrainPending: number = 0;
  davtrainApprove: number = 0;
  davtrainCancel: number = 0;

  finalStep() {
    this.dataListResFacilities.forEach((item: any) => {
      if (item.categoryId === 'C230425092142') {
        if (item.status == 1) {
          this.ovalApprove++;
        }
        if (item.status == -1) {
          this.ovalCancel++;
        }
        if (item.status == null) {
          this.ovalPending++;
        }
      }
      if (item.categoryId === 'C230425092153') {
        if (item.status == 1) {
          this.footApprove++;
        }
        if (item.status == -1) {
          this.footCancel++;
        }
        if (item.status == null) {
          this.footPending++;
        }
      }
      if (item.categoryId === 'C230425092213') {
        if (item.status == 1) {
          this.swimApprove++;
        }
        if (item.status == -1) {
          this.swimCancel++;
        }
        if (item.status == null) {
          this.swimPending++;
        }
      }
      if (item.categoryId === 'C230425092226') {
        if (item.status == 1) {
          this.outApprove++;
        }
        if (item.status == -1) {
          this.outCancel++;
        }
        if (item.status == null) {
          this.outPending++;
        }
      }
      if (item.categoryId === 'C230425092239') {
        if (item.status == 1) {
          this.trainApprove++;
        }
        if (item.status == -1) {
          this.trainCancel++;
        }
        if (item.status == null) {
          this.trainPending++;
        }
      }
      if (item.categoryId === 'C230425092314') {
        if (item.status == 1) {
          this.clubApprove++;
        }
        if (item.status == -1) {
          this.clubCancel++;
        }
        if (item.status == null) {
          this.clubPending++;
        }
      }
      if (item.categoryId === 'C230425092327') {
        if (item.status == 1) {
          this.pavApprove++;
        }
        if (item.status == -1) {
          this.pavCancel++;
        }
        if (item.status == null) {
          this.pavPending++;
        }
      }
      if (item.categoryId === 'C230425092351') {
        if (item.status == 1) {
          this.davgymApprove++;
        }
        if (item.status == -1) {
          this.davgymCancel++;
        }
        if (item.status == null) {
          this.davgymPending++;
        }
      }
      if (item.categoryId === 'C230425161142') {
        if (item.status == 1) {
          this.entiresportscomplexApprove++;
        }
        if (item.status == -1) {
          this.entiresportscomplexCancel++;
        }
        if (item.status == null) {
          this.entiresportscomplexPending++;
        }
      }
      if (item.categoryId === 'C230601151302') {
        if (item.status == 1) {
          this.davcolApprove++;
        }
        if (item.status == -1) {
          this.davcolCancel++;
        }
        if (item.status == null) {
          this.davcolPending++;
        }
      }
      if (item.categoryId === 'C230601152231') {
        if (item.status == 1) {
          this.trainApprove++;
        }
        if (item.status == -1) {
          this.trainCancel++;
        }
        if (item.status == null) {
          this.trainPending++;
        }
      }
    });
  }
}
