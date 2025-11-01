
import {Component, computed, inject} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {IamStore} from '../../../../iam/application/iam.store';
import {ProfileStore} from '../../../../profile/application/profile.store';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarRow,
    MatToolbar,
    MatButton,
    RouterLinkActive,
    TranslatePipe,
    LanguageSwitcher
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

  private router = inject(Router);

  options = [
    {link: '/marketplace/home', label: 'option.home'},
    {link: '/community/forum', label: 'option.forum'},
  ];

  optional = [
    {link: '/sign-up', label: 'option.sign-up'},
    {link: '/log-in', label: 'option.log-in'},
  ]

  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);

  currentProfile = computed(() =>
    this.profileStore.profiles().find(p =>
    p.accountId === this.iamStore.currentAccount?.id));

  currentUser = computed(() =>
    this.iamStore.getUserById(this.iamStore.currentAccount?.userId!)());

  selectProfile(){
    if(!this.iamStore.currentAccount) return;
    this.router.navigate([`/profile/${this.currentProfile()?.id}`]).then();
  }

}

