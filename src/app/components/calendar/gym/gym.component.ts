import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css'],
})
export class GymComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | any;

  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void } };

  @ViewChild('openbutton')
  openbutton!: { nativeElement: { click: () => void } };

  s_t: any = [
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
  e_t: any = [
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

  AddEvent() {
    const newEvent: EventInput = this.object;
    this.eventszxc.push(newEvent);
    this.calendarComponent.getApi().addEvent(newEvent);
    this.object = {};
    this.closebutton.nativeElement.click();
  }

  clear() {
    this.calendarComponent.getApi().removeAllEvents();
    this.finalList = [];
    this.reservedFinalList = [];
    this.cancelFinalList = [];
    this.object = {};
  }

  selectedValue: any;
  finalList: any = [];
  reservedFinalList: any = [];
  cancelFinalList: any = [];
  onSelectChange(event: any) {
    this.clear();
    this.approvedList.forEach((item: any) => {
      if (item.categoryName === event) {
        this.finalList.push(item);
      }
    });
    this.reservedList.forEach((item: any) => {
      if (item.categoryName === event) {
        this.reservedFinalList.push(item);
      }
    });
    this.cancelList.forEach((item: any) => {
      if (item.categoryName === event) {
        this.cancelFinalList.push(item);
      }
    });
    this.finalStep();
    this.finalStepReserved();
    this.finalStepCancel();
  }
  nameColor: number | any;
  finalStepCancel() {
    this.cancelFinalList.forEach((item: any) => {
      this.nameColor = 3;
      this.object.color = 'red';
      this.object.textColor = 'black';
      this.object.start = item.date;
      this.object.end = item.dateEndplus;
      this.object.title = item.title;
      this.object.categoryName = item.categoryName;
      this.object.facilityName = item.facilityName;
      this.object.s_t = item.startTime;
      this.object.e_t = item.endTime;
      this.object.participantNo = item.participantNo;
      this.object.clientName = item.clientName;
      this.AddEvent();
    });
  }
  finalStepReserved() {
    this.reservedFinalList.forEach((item: any) => {
      this.nameColor = 2;
      this.object.color = 'yellow';
      this.object.textColor = 'black';
      this.object.start = item.date;
      this.object.end = item.dateEndplus;
      this.object.title = item.title;
      this.object.categoryName = item.categoryName;
      this.object.facilityName = item.facilityName;
      this.object.s_t = item.startTime;
      this.object.e_t = item.endTime;
      this.object.participantNo = item.participantNo;
      this.object.clientName = item.clientName;
      this.AddEvent();
    });
  }
  finalStep() {
    this.finalList.forEach((item: any) => {
      // this.object.color = 'green';
      this.nameColor = 1;
      this.object.start = item.date;
      this.object.end = item.dateEndplus;
      this.object.textColor = 'black';
      this.object.title = item.title;
      this.object.categoryName = item.categoryName;
      this.object.facilityName = item.facilityName;
      this.object.s_t = item.startTime;
      this.object.e_t = item.endTime;
      this.object.participantNo = item.participantNo;
      this.object.clientName = item.clientName;
      this.AddEvent();
    });
  }

  EditEvent(object: any) {
    this.handle.event.setProp('title', object.title);
    this.calendarComponent.getApi().refetchEvents(this.handle.event);
    this.object = {};
    this.closebutton.nativeElement.click();
  }

  visible: boolean = false;
  not_visible: boolean = false;

  object: any = {};
  eventszxc: EventInput[] = [];
  // events:any = [{ date: "2023-04-01" , title: "event 1"}, { date: '2023-04-02',  title: 'event 2'},  { date: '2023-04-03',  title: 'event 3' }];
  events: any = [];
  dataListResFacilities: any = [];

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.GetListResFacilities();
    this.GetListFacilityCategories();
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    events: this.events,
    eventClick: this.handleEventClick.bind(this), // MUST ensure `this` context is maintained
    // dateClick: this.handleDateClick.bind(this)
  };

  GetListResFacilities() {
    this.service.ViewListResFacilities().subscribe((data) => {
      this.dataListResFacilities = <any>data;
      console.log(' list', this.dataListResFacilities);
      this.filter();
      console.log('approvedList', this.approvedList);
      console.log('reservedList', this.reservedList);
      // this.approvedList.forEach((item: any) => {
      //   this.object.date = item.date;
      //   this.object.title = item.title;
      //   this.object.categoryName = item.categoryName;
      //   this.object.facilityName = item.facilityName;
      //   this.object.s_t = item.startTime;
      //   this.object.e_t = item.endTime;
      //   this.object.participantNo = item.participantNo;
      //   this.AddEvent();

      // });
    });
  }
  approvedList: any = [];
  reservedList: any = [];
  cancelList: any = [];
  filter() {
    this.dataListResFacilities.forEach((item: any) => {
      if (item.status === 1) {
        this.approvedList.push(item);
      }
      if (item.status == null) {
        this.reservedList.push(item);
      }
      if (item.status == -1) {
        this.cancelList.push(item);
      }
    });
  }

  // handleDateClick(arg:any){
  //   // alert('date click! ' + arg.dateStr)
  //   this.object = {};
  //   this.object.date = arg.dateStr
  //   this.openbutton.nativeElement.click();
  //   this.visible = true;
  //   this.not_visible = false;

  // }

  handle: any = {};
  timeConverterS_T: any;
  timeConverterE_T: any;
  handleEventClick(arg: any) {
    // alert('date click! ' + arg.dateStr)
    this.handle = arg;
    this.object = arg.event._def;
    this.object.categoryName = arg.event._def.extendedProps.categoryName;
    this.object.facilityName = arg.event._def.extendedProps.facilityName;
    this.object.participantNo = arg.event._def.extendedProps.participantNo;
    this.object.clientName = arg.event._def.extendedProps.clientName;
    this.s_t.forEach((item: any) => {
      if (arg.event._def.extendedProps.s_t === item.int) {
        this.timeConverterS_T = item.type;
      }
    });
    this.e_t.forEach((item: any) => {
      if (arg.event._def.extendedProps.e_t === item.int) {
        this.timeConverterE_T = item.type;
      }
    });
    this.object.s_t = this.timeConverterS_T;
    this.object.e_t = this.timeConverterE_T;
    this.openbutton.nativeElement.click();
    this.visible = false;
    this.not_visible = true;
  }

  listfacilitycategory: any = [];
  GetListFacilityCategories() {
    this.service.GetListFacilityCategories().subscribe((data) => {
      this.listfacilitycategory = <any>data;
    });
  }
}
