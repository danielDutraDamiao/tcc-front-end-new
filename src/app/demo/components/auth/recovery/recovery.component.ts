import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { CadastroService } from 'src/app/demo/services/cadastro/cadastro.service';
import { UserService } from 'src/app/demo/services/user/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {

  public formRecovery: FormGroup;
  messages: Message[] | undefined;

  constructor(
    private fb: FormBuilder,
    private cadastroService: CadastroService,
    private userService: UserService,
    public layoutService: LayoutService,
    private route: Router
  ) {
    this.formRecovery = this.createRecoveryForm();
  }

  ngOnInit() {}

  private createRecoveryForm(): FormGroup {
    return this.fb.group({
      username: ["", [Validators.required, Validators.minLength(6)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(frm: FormGroup) {
    return frm.get('password')?.value === frm.get('confirmPassword')?.value 
           ? null : {'mismatch': true};
  }

  submitForm() {
    if (this.formRecovery.valid) {
      const recoveryData = this.formRecovery.value;
      this.userService.recuperarSenha(recoveryData.username, recoveryData.password, recoveryData.confirmPassword).subscribe(
        response => {
          this.messages = [{ severity: 'success', summary: 'Senha Alterada', detail: 'Sua senha foi alterada com sucesso!' }];
          setTimeout(() => {
            this.route.navigate(['/login']);
          }, 2000);
        },
        error => {
          console.error('Erro na recuperação de senha:', error);
          this.messages = [{ severity: 'error', summary: 'Erro', detail: 'Erro na recuperação de senha.' }];
        }
      );
    } else {
      this.messages = [{ severity: 'error', summary: 'Formulário Inválido', detail: 'Por favor, preencha o formulário corretamente.' }];
    }
  }

}
