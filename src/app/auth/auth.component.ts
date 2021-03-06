import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    this.error = null;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
     authObs = this.authService.login(email, password);
    } else {
     authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(res => {
      console.log(res);
      this.isLoading = false;
    }, errorMessage => {
      console.error(errorMessage);
      this.error = `An error occurred: ${errorMessage}`;
      this.isLoading = false;
    })

    form.reset();
  }
}
