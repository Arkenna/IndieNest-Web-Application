import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../../application/profile.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatButton} from '@angular/material/button';
import {Project} from '../../../../project/application/project.store';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-profile-view',
  imports: [
    MatButton,
    FormsModule,
    MatInput,
    ReactiveFormsModule,
    TranslatePipe
  ],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css',
})
export class ProfileView {

  private route = inject(ActivatedRoute);
  readonly profileStore = inject(ProfileStore);
  readonly iamStore = inject(IamStore);
  readonly projectStore = inject(Project);

  readonly profileId = signal<number | null>(null);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      this.profileId.set(id);
    });
  }

  currentProfile = computed(() =>
    this.profileStore.getProfileById(this.profileId()!)()
  );

  profileAccount = computed(() =>
    this.iamStore.accounts().find(a => a.id === this.currentProfile()?.accountId)
  );

  profileUser = computed(() =>
    this.iamStore.getUserById(this.profileAccount()?.userId ?? 0)()
  );

  profilePortfolio = computed(() =>
    this.profileStore.getPortfolioById(this.currentProfile()?.portfolioId ?? 0)()
  );

  portfolioGames = computed(() => {
    const portfolio = this.profilePortfolio();
    if (!portfolio?.gameIds) return [];
    return this.projectStore.games().filter(g => portfolio.gameIds.includes(g.id));

  });

  isEditing = false;
  private fb = inject(FormBuilder);

  form = this.fb.group({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    phone: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });



  enableEdit(){
    this.isEditing = !this.isEditing;
  }

  submit(){

  }

  cancel(){
    this.isEditing = false;
  }
}
