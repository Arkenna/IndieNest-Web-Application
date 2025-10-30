import {Component, inject} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {IamStore} from '../../../application/iam.store';
import {User} from '../../../domain/model/user.entity';
import {Account} from '../../../domain/model/account.entity';
import {AccountType} from '../../../domain/model/account-type';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-sign-up-view',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    TranslatePipe,
    MatInput,
    MatInputModule
  ],
  templateUrl: './sign-up-view.html',
  styleUrl: './sign-up-view.css'
})
export class SignUpView {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private iamStore = inject(IamStore);

  form = this.fb.group({
    name: new FormControl<string>('',{ nonNullable: true, validators: [Validators.required] }),
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    passwordConfirmation: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    phoneNumber: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  }, { validators: [this.passwordsMatchValidator] });

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('passwordConfirmation')?.value;
    if (!password || !confirm) return null;
    return password === confirm ? null : { passwordsMismatch: true };
  }

  submit() {
    if(!this.form.valid) return;

    const user: User = new User({
      id: this.iamStore.userCount() + 1,
      name: this.form.value.name!,
      phoneNumber: this.form.value.phoneNumber!
    });

    const account = new Account({
      id: this.iamStore.accountCount() + 1,
      userId: user.id,
      email: this.form.value.email!,
      password: this.form.value.password!,
      isActive: true,
      role: AccountType.STANDARD
    });

    this.iamStore.addUser(user);
    this.iamStore.addAccount(account);
    this.router.navigate(['home']).then();
  }
}
