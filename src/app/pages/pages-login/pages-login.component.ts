import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css'],
})
export class PagesLoginComponent implements OnInit {
  constructor(private service: SharedService, private route: Router) {}

  ngOnInit(): void {}

  login: any = {};
  credential: boolean = false;

  triggerButton() {
    this.onLogin();
  }

  onLogin() {
    // debugger;

    this.service.onLogin(this.login).subscribe({
      next: (data: any) => {
        localStorage.setItem('fName', data.fName);
        localStorage.setItem('userName', data.userType);
        localStorage.setItem('account', data.account);
        localStorage.setItem('token', data.jwtToken);
        const expireDate = new Date().toString();
        const expireDateFinal = moment(expireDate).format('MMM Do YYYY');
        localStorage.setItem('expire', expireDateFinal);
        this.route.navigateByUrl('/');
      },
      error: (error: any) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'error',
          title: 'Invalid username or password',
        });
      },
      complete: () => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully',
        });
      },
    });
  }
}
