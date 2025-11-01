import {Component, computed, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ArtItem } from '../../components/art-item/art-item';
import { Art } from '../../../../project/domain/model/art.entity';
import { ArtCategory } from '../../../../project/domain/model/art-category';
import {Project} from '../../../../project/application/project.store';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-arts-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ArtItem,
    TranslatePipe
  ],
  templateUrl: './arts-view.html',
  styleUrl: './arts-view.css'
})
export class ArtsView {

  private projectStore = inject(Project);
  arts = this.projectStore.arts

  bestRatedArts = computed(() =>
    [...this.arts()].sort((a, b) => b.rating - a.rating)
  );

  trendingArts = computed(() =>
    this.bestRatedArts()
  );

  newArts = computed(() => {
    return [...this.arts()].sort((a, b) =>
      new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
    );
  });

  marketplaceOptions = [
    {link: "/marketplace/games", label: "marketplace.games"},
    {link: "/marketplace/arts", label: "marketplace.arts"},
    {link: "/marketplace/audios", label: "marketplace.audios"},
    {link: "/marketplace/developers", label: "marketplace.developers"},
  ]

  searchTerm = signal('');

  filteredArts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    if (!term) return this.arts(); // si está vacío, devuelve todos

    return this.arts().filter(art =>
      art.name.toLowerCase().includes(term)
    );
  });

  onSearch() {
    // opcional: podrías desplazar al área principal o hacer otra acción
    console.log('Buscando:', this.searchTerm());
  }


}
