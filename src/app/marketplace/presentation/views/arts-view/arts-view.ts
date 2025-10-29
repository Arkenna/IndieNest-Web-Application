import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';


import { ArtItem } from '../../components/art-item/art-item';


import { Art } from '../../../../project/domain/model/art.entity';
import { ArtCategory } from '../../../../project/domain/model/art-category';

@Component({
  selector: 'app-arts-view',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ArtItem
  ],
  templateUrl: './arts-view.html',
  styleUrl: './arts-view.css'
})
export class ArtsView {


  bestRatedArt: Art[] = [
    new Art({ id: 11, authorId: 301, name: 'Cyber City Alley', description: '...', rating: 4.9, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+BR1', category: ArtCategory.CONCEPT_ART }),
    new Art({ id: 12, authorId: 302, name: 'Forest Sprite', description: '...', rating: 4.8, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+BR2', category: ArtCategory.CHARACTER_DESIGN }),
    new Art({ id: 13, authorId: 303, name: 'Pixel Sunset', description: '...', rating: 4.7, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+BR3', category: ArtCategory.PIXEL_ART }),
  ];

  trendingArt: Art[] = [
    new Art({ id: 14, authorId: 304, name: 'Abstract Forms', description: '...', rating: 4.6, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+T1', category: ArtCategory.CONCEPT_ART }),
    new Art({ id: 15, authorId: 305, name: 'RPG Characters Pack', description: '...', rating: 4.5, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+T2', category: ArtCategory.CHARACTER_DESIGN }),
    new Art({ id: 16, authorId: 306, name: 'Isometric Room', description: '...', rating: 4.4, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+T3', category: ArtCategory.PIXEL_ART }),
  ];

  newArt: Art[] = [
    new Art({ id: 17, authorId: 307, name: 'Sci-Fi Corridor', description: '...', rating: 4.3, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+N1', category: ArtCategory.BACKGROUND_DESIGN }),
    new Art({ id: 18, authorId: 308, name: 'Fantasy Poster', description: '...', rating: 4.2, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+N2', category: ArtCategory.POSTER }),
    new Art({ id: 19, authorId: 309, name: 'Fan Art - Zelda', description: '...', rating: 4.1, creationDate: new Date(), image: 'https://placehold.co/250x140/222/92FF71?text=Art+N3', category: ArtCategory.FAN_ART }),
  ];
}
