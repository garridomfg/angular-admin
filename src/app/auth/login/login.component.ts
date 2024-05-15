import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn')
  googleBtn!: ElementRef;

  public formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email' || ''),
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [Boolean(localStorage.getItem('remember') || false)],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id:
        '227418785982-kjgol3sf112216827mok9654b7h5uim1.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(this.googleBtn.nativeElement, {
      theme: 'outline',
      size: 'large',
    });
  }

  handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential).subscribe((resp) => {
      this.router.navigateByUrl('/');
    });
  }

  login(): void {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password, remember } = this.loginForm.value;

    if (email !== null && password !== null) {
      this.userService
        .login({ email: email!, password: password!, remember: remember! })
        .subscribe(
          (resp) => {
            if (this.loginForm.get('remember')!.value) {
              localStorage.setItem(
                'email',
                this.loginForm.get('email')!.value!
              );
              localStorage.setItem(
                'remember',
                this.loginForm.get('remember')!.value!.toString()
              );
            } else {
              localStorage.removeItem('email');
              localStorage.removeItem('remember');
            }

            this.router.navigateByUrl('/');
          },
          (err) => {
            Swal.fire('Error', err.error.msg, 'error');
          }
        );
    }
  }

  invalidField(inputName: string): boolean {
    if (this.loginForm.get(inputName)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }
}
