import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { FullCalendarComponent } from '@fullcalendar/angular';
import { SharedService } from 'src/app/shared.service';



@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.css']
})
export class GymComponent implements OnInit {


  
  @ViewChild('calendar') calendarComponent: FullCalendarComponent | any;

  @ViewChild('closebutton')
  closebutton!: { nativeElement: { click: () => void; }; };

  @ViewChild('openbutton')
  openbutton!: { nativeElement: { click: () => void; }; };
 


  AddEvent(){
    const newEvent: EventInput = this.object;
    this.eventszxc.push(newEvent);
    this.calendarComponent.getApi().addEvent(newEvent);
    this.object = {};
    console.log("add_data", this.eventszxc);
    this.closebutton.nativeElement.click();
      
  }

  EditEvent(object:any){
    console.log("title", object);
    this.handle.event.setProp('title',object.title); 
    this.calendarComponent.getApi().refetchEvents(this.handle.event);
    this.object = {};
    this.closebutton.nativeElement.click();
  }
 
  

  visible:boolean = false;
  not_visible:boolean = false; 


  object :any = {};
  eventszxc: EventInput [] = [];
  // events:any = [{ date: "2023-04-01" , title: "event 1"}, { date: '2023-04-02',  title: 'event 2'},  { date: '2023-04-03',  title: 'event 3' }];
  events:any = [];
  dataListResFacilities:any = [];


  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.GetListResFacilities();
  } 


  calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin,interactionPlugin],
  events: this.events,
  eventClick: this.handleEventClick.bind(this), // MUST ensure `this` context is maintained
  dateClick: this.handleDateClick.bind(this)
  }; 

  GetListResFacilities(){
    this.service.GetListResFacilities().subscribe(data=>{
      console.log(data);
      this.dataListResFacilities = (<any>data);
      console.log("reslist", this.dataListResFacilities);
      this.dataListResFacilities.forEach((item: any) => {
        this.object.date = item.date;
        this.object.title = item.title;
        this.AddEvent();

      });
      
      console.log("check", this.events);

    }) 
  }


  handleDateClick(arg:any){
    // alert('date click! ' + arg.dateStr)
    this.object = {};
    this.object.date = arg.dateStr
    this.openbutton.nativeElement.click();
    this.visible = true;
    this.not_visible = false;

  }

  
  handle:any = {};
  handleEventClick(arg:any) {
    // alert('date click! ' + arg.dateStr)
    // console.log(arg.event._def.title);
    this.handle = arg;
    this.object = arg.event._def
    this.openbutton.nativeElement.click();
    this.visible = false;
    this.not_visible = true;
  }
}



