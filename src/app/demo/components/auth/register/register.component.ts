import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { PerfilDTO } from 'src/app/demo/models/perfil.dto';
import { CadastroService } from 'src/app/demo/services/cadastro/cadastro.service';
import { PerfilService } from 'src/app/demo/services/perfil/perfil.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: any[] = [];
  messages: Message[] | undefined;
  perfils: PerfilDTO[] = [];
  public formCadastro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private perfilService: PerfilService,
    public layoutService: LayoutService,
    private route: Router) {
    this.formCadastro = this.criarFormCadastro();
  }

  ngOnInit() {
    forkJoin({
      perfils: this.perfilService.listarPerfils(),
    }).subscribe(result => {
      this.perfils = result.perfils;
    });
    }

  public criarFormCadastro(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      username: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      perfil: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  }

  public isFormControlInvalid(controlName: string): boolean {
    const control = this.formCadastro.get(controlName);
    return !!control?.invalid && control?.touched;
  }

  public isPasswordMismatch(): boolean {
    const password = this.formCadastro.get('password')?.value;
    const confirmPassword = this.formCadastro.get('confirmPassword')?.value;
    return password !== confirmPassword;
  }

  submitForm() {
    console.log(this.formCadastro.value)
    console.log(this.formCadastro.valid)
    if (this.formCadastro.valid) {
      this.cadastroService.criarUsers(this.formCadastro.value).subscribe(
        response => {
          console.log('Usuário criado com sucesso!', response);
          this.messages = [{ severity: 'success', summary: 'Sucesso', detail: 'Usuário criado com sucesso!' }];
  
          // Esperar 2 segundos antes de redirecionar
          setTimeout(() => {
            this.route.navigate(['/login']); // Substitua '/login' pela rota de login
          }, 2000);
        },
        error => {
          console.error('Erro ao criar o usuário:', error);
          this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Falha ao criar o usuário.' }];
        }
      );
    } else {
      this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Formulário inválido.' }];
    }
  }

}

