import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; 
import { FullCalendarComponent } from '@fullcalendar/angular';


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
  // events:any = [{ date: '2023-04-01' , title: 'event 1', id : 11}, { date: '2023-04-02',  title: 'event 2', id : 12},  { date: '2023-04-03',  title: 'event 3' , id : 13}];
  events:any = [];

 


  constructor() {}

  ngOnInit(): void {
   
  } 

  calendarOptions: CalendarOptions = {
  initialView: 'dayGridMonth',
  plugins: [dayGridPlugin,interactionPlugin],
  events: this.events,
  eventClick: this.handleEventClick.bind(this), // MUST ensure `this` context is maintained
  dateClick: this.handleDateClick.bind(this)
  }; 



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



