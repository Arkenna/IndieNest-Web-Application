import {Component, computed, inject, signal, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Project as ProjectStore} from '../../../application/project.store'; // Renombrado para evitar conflicto de nombres
import {DatePipe, CurrencyPipe, NgIf, NgForOf} from '@angular/common';
import {SupportStore} from '../../../../support/application/support.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ReviewItem} from '../../../../support/presentation/components/review-item/review-item';
import {Project} from '../../../domain/model/project.entity'; // Importa la entidad base Project
import {User} from '../../../../iam/domain/model/user.entity';


@Component({
  selector: 'app-project-view',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    NgIf,
    NgForOf,
    ReviewItem,
    TranslatePipe,
    MatCardModule,
    MatButton,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './project-view.html',
  styleUrl: './project-view.css',
})
export class ProjectView implements OnInit {

  private route = inject(ActivatedRoute);
  readonly projectStore = inject(ProjectStore);
  readonly supportStore = inject(SupportStore);
  readonly iamStore = inject(IamStore);

  readonly projectId = signal<number | null>(null);
  readonly projectType = signal<string | null>(null);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'] ? +params['id'] : null;
      const type = params['type'] ? params['type'] : null;
      this.projectId.set(id);
      this.projectType.set(type);
    });
  }

  project = computed<Project | undefined>(() => {
    const id = this.projectId();
    const type = this.projectType();
    if (!id || !type) return undefined;

    switch (type) {
      case 'game':
        return this.projectStore.getGameById(id)();
      case 'art':
        return this.projectStore.getArtById(id)();
      case 'audio':
        return this.projectStore.getAudioById(id)();
      default:
        return undefined;
    }
  });

  projectAuthor = computed<User | undefined>(() => {
    const proj = this.project();
    return proj ? this.iamStore.getUserById(proj.authorId)() : undefined;
  });
  reviews = computed(() => {
    const proj = this.project();
    return proj ? this.supportStore.getReviewsByProjectId(proj.id)() : [];
  });

  averageRating = computed(() => {
    const reviews = this.reviews();
    if (reviews.length === 0) return this.project()?.rating ?? 0;

    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Math.round(sum / reviews.length);
  });
}
