import {Component, computed, inject} from '@angular/core';
import {CommunityStore} from '../../../application/community.store';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {PublicationItem} from '../../components/publication-item/publication-item';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader, MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-forum',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatButton,
    PublicationItem,
    TranslatePipe
  ],
  templateUrl: './forum.html',
  styleUrl: './forum.css',
})
export class Forum {
  readonly communityStore = inject(CommunityStore);
  publications = computed(() => this.communityStore.publications());
  protected router = inject(Router);

  newPublication(){
    this.router.navigate(['/forum/new-publication']).then();
  }


}
