import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public formSubmitted: boolean = false;

  public registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
      terms: [false, Validators.required],
    },
    {
      validators: this.equalsPasswords('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  createUser() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    // Create user
    this.userService.createUser(this.registerForm.value).subscribe(
      (resp) => {
        console.log(resp);
        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  invalidField(inputName: string): boolean {
    if (this.registerForm.get(inputName)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  invalidPasswords(): boolean {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    }
    return false;
  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms')!.value && this.formSubmitted;
  }

  equalsPasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value.length < 8) {
        return pass1Control?.setErrors({
          minLength: true,
        });
      }

      if (pass1Control?.value === pass2Control?.value) {
        pass1Control?.setErrors(null);
      } else {
        pass1Control?.setErrors({
          notEqual: true,
        });
      }
    };
  }
}
