import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { timer } from 'rxjs';
import * as moment from 'moment';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document, private route: Router, private bnIdle: BnNgIdleService) { }

  ngOnInit(): void {
    if(localStorage.getItem('token')!= null){
      this.bnIdle.startWatching(3600).subscribe((isTimedOut: boolean) => {
        if (isTimedOut) {
          this.logOut();
          console.log('session expired');
          this.bnIdle.stopTimer();
        }
      });
    }
    this.performActionWithTimeout();
  }

  userName:any = localStorage.getItem('userName');
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
 

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('account');
    localStorage.removeItem('expire');
    this.route.navigateByUrl('/pages-login');
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Logout successfully'
    })
  }

  // This method will be called after a timeout of 3 seconds
  performActionWithTimeout(): void {
    const expireDate = new Date().toString();
    const expireDateFinal = moment(expireDate).format('MMM Do YYYY');
    if(localStorage.getItem('token') != null){
      if(localStorage.getItem('expire') != expireDateFinal){
      this.logOut();
    }
    }
  }


}
