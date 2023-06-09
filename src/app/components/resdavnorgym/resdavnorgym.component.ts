import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import * as moment from 'moment';

@Component({
  selector: 'app-resdavnorgym',
  templateUrl: './resdavnorgym.component.html',
  styleUrls: ['./resdavnorgym.component.css'],
})
export class ResdavnorgymComponent implements OnInit {
  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.GetListDavNorGym();
    this.GetListOther();
    this.GetListResDavNorGym();
  }
  myData: any;
  myDate = new Date();
  formattedDate = moment(this.myDate).format('MMM Do YYYY, h:mm:ss a');

  dataArray: any = [];
  dataArrayOther: any = [];
  dataArrayItem: any = [];

  dataListDavGym: any = [];
  dataListResGym: any = [];
  dataListOthers: any = [];

  dataResGym: any = {};
  dataResOther: any = {};

  addData: any = {};
  startTime: any = [
    { int: 8, type: `8:00 AM` },
    { int: 9, type: `9:00 AM` },
    { int: 10, type: `10:00 AM` },
    { int: 11, type: `11:00 AM` },
    { int: 12, type: `12:00 PM` },
    { int: 13, type: `1:00 PM` },
    { int: 14, type: `2:00 PM` },
    { int: 15, type: `3:00 PM` },
    { int: 16, type: `4:00 PM` },
    { int: 17, type: `5:00 PM` },
    { int: 18, type: `6:00 PM` },
    { int: 19, type: `7:00 PM` },
    { int: 20, type: `8:00 PM` },
    { int: 21, type: `9:00 PM` },
  ];
  endTime: any = [
    { int: 9, type: `9:00 AM` },
    { int: 10, type: `10:00 AM` },
    { int: 11, type: `11:00 AM` },
    { int: 12, type: `12:00 PM` },
    { int: 13, type: `1:00 PM` },
    { int: 14, type: `2:00 PM` },
    { int: 15, type: `3:00 PM` },
    { int: 16, type: `4:00 PM` },
    { int: 17, type: `5:00 PM` },
    { int: 18, type: `6:00 PM` },
    { int: 19, type: `7:00 PM` },
    { int: 20, type: `8:00 PM` },
    { int: 21, type: `9:00 PM` },
  ];

  checker: any;
  checkerOther: any;
  checkerdate: any;

  validator: number | any;
  validate: any = {};

  rate: number | any;
  rateOther: number = 0;
  sTime: number | any;
  eTime: number | any;
  totalTime: number | any;

  GetListDavNorGym() {
    this.service.GetListDavNorGym().subscribe((data) => {
      this.dataListDavGym = <any>data;
      console.log('list', data);
    });
  }

  GetListResDavNorGym() {
    this.service.GetListResDavNorGym().subscribe((data) => {
      this.dataListResGym = <any>data;
      console.log('list', data);
      this.dataListResGym.forEach((item: any) => {
        item.eventDate = moment(item.eventDate).format('MMM Do YYYY');
      });
    });
  }

  GetListOther() {
    this.service.GetListOther().subscribe((data) => {
      this.dataListOthers = <any>data;
      console.log('other', data);
    });
  }

  AddResDavNorGym() {
    this.validateInput();
    this.dateValidator();
    if (this.validator != 1) {
      this.addPurpose();
      this.total();
      console.log('data', this.addData);
      this.service.AddResDavNorGym(this.addData).subscribe((data) => {
        console.log('add_resgym', data);
        this.GetListResDavNorGym();
        this.addData = {};
        this.dataArrayItem = [];
        this.rateOther = 0;
        this.checkerOther = null;
      });
    } else {
      console.log('exist');
      this.validator = 0;
    }
  }

  validateInput() {
    this.validate.purpose = this.checker == null ? true : false;
    this.validate.eventDate = this.addData.eventDate == null ? true : false;
    this.validate.startTime = this.addData.startTime == null ? true : false;
    this.validate.endTime = this.addData.endTime == null ? true : false;
    if (
      this.validate.purpose ||
      this.validate.eventDate ||
      this.validate.startTime ||
      this.validate.endTime
    ) {
      console.log('need input');
      this.validator = 1;
    }
  }

  total() {
    this.sTime = this.addData.startTime;
    this.eTime = this.addData.endTime;
    this.totalTime = this.eTime - this.sTime;
    this.addData.total =
      this.rate * this.totalTime + this.rateOther * this.totalTime;
  }

  dateValidator() {
    this.checkerdate = moment(this.addData.eventDate).format('MMM Do YYYY');
    console.log('checker1', this.dataListResGym);
    console.log('checker2', this.checkerdate);
    this.dataListResGym.forEach((item: any) => {
      if (item.eventDate === this.checkerdate) {
        console.log('exist');
        this.validator = 1;
      }
    });
  }

  addPurpose() {
    this.addData.reservationDate = this.formattedDate;
    console.log('data', this.checker);
    this.dataListDavGym.forEach((item: any) => {
      if (item.facilityId == this.checker) {
        this.dataArray.push(item);
        this.dataResGym = this.dataArray[0];
        //delete the first element in array
        this.dataArray.splice(0, this.dataArray.length);
        console.log('dataList', this.dataResGym);
        this.addData.categoryId = this.dataResGym.categoryId;
        this.addData.purpose = this.dataResGym.purpose;
        this.addData.temperature = this.dataResGym.temp;
        this.rate = this.dataResGym.rate;
      }
    });
  }

  addOthers() {
    this.dataListOthers.forEach((item: any) => {
      if (item.othersId == this.checkerOther) {
        this.dataArrayOther.push(item);
        this.dataResOther = this.dataArrayOther[0];
        //delete the first element in array
        this.dataArrayOther.splice(0, this.dataArrayOther.length);
        // this.addData.otherItem = this.dataResOther.otherItem;
        this.dataArrayItem.push(this.dataResOther.otherItem);
        const combinedData = this.dataArrayItem.join(', ');
        this.addData.otherItem = combinedData;
        this.rateOther = this.dataResOther.rate + this.rateOther;
        console.log('other rate', this.rateOther);
        console.log('other rate', combinedData);
      }
    });
  }
}
