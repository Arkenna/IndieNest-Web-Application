import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProfileStore} from '../../../application/profile.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {Profile} from '../../../domain/model/profile.entity';
import {Account} from '../../../../iam/domain/model/account.entity';
import {User} from '../../../../iam/domain/model/user.entity';

@Component({
  selector: 'app-profile-view',
  imports: [],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.css',
})
export class ProfileView {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  profileId: number | null = null;

  readonly profileStore = inject(ProfileStore);
  readonly iamStore = inject(IamStore);

  currentProfile : Profile | undefined;
  profileAccount: Account | undefined;
  profileUser: User | undefined;

  constructor() {
    this.route.params.subscribe(params => {
      this.profileId = params['id'] ? +params['id'] : null;
    })

    this.currentProfile = this.profileStore.getProfileById(this.profileId!)();
    this.profileAccount = this.iamStore.accounts().find(a => a.id === this.currentProfile?.accountId);
    this.profileUser = this.iamStore.getUserById(this.profileAccount!.userId)();
  }


}
