import {Component, inject} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IamStore} from '../../../application/iam.store';
import {TranslatePipe} from '@ngx-translate/core';



@Component({
  selector: 'app-log-in-view',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './log-in-view.html',
  styleUrl: './log-in-view.css'
})
export class LogInView {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private iamStore = inject(IamStore);

  credentialNotFound = false

  form = this.fb.group({
    identifier: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  submit() {
    if(!this.form.valid) return;

    const account = this.iamStore.accounts().find(account => account.email === this.form.value.identifier);
    const user = this.iamStore.users().find(user => user.name === this.form.value.identifier);

    if(account && account.password === this.form.value.password) {
      this.iamStore.currentAccount = account;
    }
    else if(user && this.iamStore.accounts().find(account => account.user === user)?.password === this.form.value.password ) {
      this.iamStore.currentAccount = this.iamStore.accounts().find(account => account.user === user)!;
    }
    else{
      this.credentialNotFound = true;
      return;
    }
    this.router.navigate(['home']).then();
  }

}
