import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecoveryComponent } from './recovery.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: RecoveryComponent }
    ])],
    exports: [RouterModule]
})
export class RecoveryRoutingModule { }
