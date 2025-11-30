import {Component, inject} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IamStore} from '../../../application/iam.store';
import {TranslatePipe} from '@ngx-translate/core';
import {SignInCommand} from '../../../domain/model/sign-in.command';



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
    if (!this.form.valid) return;

    this.credentialNotFound = false;

    const signInCommand = new SignInCommand({
      email: this.form.value.identifier!,
      password: this.form.value.password!
    });

    this.iamStore.signIn(signInCommand, this.router);
  }

}
