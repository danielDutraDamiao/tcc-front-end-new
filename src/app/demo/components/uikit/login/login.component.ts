import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { EstadoDTO } from 'src/app/demo/models/estado.dto';
import { OngDTO } from 'src/app/demo/models/ong.dto';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  rememberMe: [false] // ou [valorInicial, validadores] se necessário


  constructor(private fb: FormBuilder, private route: Router, private toast: ToastrService, private loginService: LoginService, public layoutService: LayoutService){
    this.formLogin = this.criarFormLogin();
  }

  ngOnInit(): void {
    
  }

  public criarFormLogin(): FormGroup{
    return this.fb.group({
      username:["", [Validators.required, Validators.minLength(3)]],
      password:["", [Validators.required, Validators.minLength(3)]]
    })
  }

  public isFormControlInvalid(controlName: string): boolean{
    return !!(this.formLogin.get(controlName)?.invalid && this.formLogin.get(controlName)?.touched)
  }

  public submitForm(){
    console.log("submit form")
    const {username, password} = this.formLogin.value;
    console.log("username: ", username)
    console.log("password: ", password)
    this.formLogin.reset();
    

    this.loginService.login(username, password).subscribe(  
      res =>{
        this.toast.success("Login efetuado com sucesso");
        this.route.navigate(['dashboard']);

      },
      err => {
        this.toast.error(err);
      }
    )
  }

  navegarParaCriarConta() {
    this.route.navigate(['/uikit/usuarios']); // Substitua '/caminho-para-criar-conta' pela rota desejada
  }
  

}

