import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login ={
    username: '',
    password: '',
  }

  constructor(
    private authenticationService: AuthenticationService, private router: Router) {  }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['']);
    }
  }

  async onSubmit(){
    try{
      const result = await this.authenticationService.login(this.login);
      console.log(`Login efetuado: ${result}`);
      this.router.navigate(['']);
    } catch(error){
      console.log(error);
    }
  }

  rota(rota){
    return rota.path
  }

  /*

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {
        this.router.navigate([this.returnUrl]);
        this.authenticationService.setUserName(this.f.username.value);
      }),
      error => {
        this.error = error;
        this.loading = false;
      }
  }
  */

  navigateToRecuperarSenha() {
    this.router.navigate(['/recuperar-senha'])
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro'])
  }
}
