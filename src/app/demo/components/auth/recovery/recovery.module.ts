import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoveryRoutingModule } from './recovery-routing.module';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { RecoveryComponent } from './recovery.component';
import { MessagesModule } from 'primeng/messages';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        RecoveryRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
        FormsModule,
        MessagesModule,
        DropdownModule
    ],
    declarations: [RecoveryComponent]
})
export class RecoveryModule { }
