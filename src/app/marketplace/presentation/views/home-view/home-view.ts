import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink, RouterLinkActive } from '@angular/router';

import { ArtItem } from '../../components/art-item/art-item';
import { AudioItem } from '../../components/audio-item/audio-item';
import { GameItem } from '../../components/game-item/game-item';

import { Art } from '../../../../project/domain/model/art.entity';
import { ArtCategory } from '../../../../project/domain/model/art-category';
import { Audio } from '../../../../project/domain/model/audio.entity';
import { AudioCategory } from '../../../../project/domain/model/audio-category';
import { Game } from '../../../../project/domain/model/game.entity';
import { GameCategory } from '../../../../project/domain/model/game-category';

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    CommonModule,
     RouterLink,
     RouterLinkActive,
    ArtItem,
    AudioItem,
    GameItem
  ],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css'
})
export class HomeView {


  featuredGames: Game[] = [
    new Game({
      id: 1, authorId: 101, name: 'Cyberpunk Runner', description: 'Fast-paced sci-fi action runner game.', rating: 4.5, creationDate: new Date('2025-10-20'),
      price: 59.99,
      category: GameCategory.PLATFORMER,
      image: 'https://placehold.co/250x140/222/92FF71?text=Game+1'
    }),
    new Game({
      id: 2, authorId: 102, name: 'Mystic Forest RPG', description: 'Explore magical woods and uncover secrets.', rating: 4.8, creationDate: new Date('2025-09-15'),
      price: 49.99,
      category: GameCategory.RPG,
      image: 'https://placehold.co/250x140/222/92FF71?text=Game+2'
    }),
    new Game({
      id: 3, authorId: 101, name: 'Zombie Survival', description: 'Survive the apocalypse.', rating: 4.2, creationDate: new Date('2025-10-01'),
      price: 39.99,
      category: GameCategory.SURVIVAL,
      image: 'https://placehold.co/250x140/222/92FF71?text=Game+3'
    }),
  ];

  featuredAudio: Audio[] = [
    new Audio({
      id: 1, authorId: 201, name: 'Synthwave Dreams', description: 'Retro electronic music track.', rating: 4.9, creationDate: new Date('2025-10-22'),
      category: AudioCategory.SOUNDTRACK,
      audioUrl: 'path/to/audio1.mp3', format: 'mp3'
    }),
    new Audio({
      id: 2, authorId: 202, name: 'Footsteps on Gravel', description: 'Realistic walking sound effect.', rating: 4.6, creationDate: new Date('2025-08-10'),
      category: AudioCategory.SOUND_EFFECT,
      audioUrl: 'path/to/audio2.wav', format: 'wav'
    }),
    new Audio({
      id: 3, authorId: 201, name: 'Voice Over Demo', description: 'Character voice acting sample.', rating: 4.7, creationDate: new Date('2025-10-25'),
      category: AudioCategory.VOICE_ACTING,
      audioUrl: 'path/to/audio3.ogg', format: 'ogg'
    }),
  ];

  featuredArt: Art[] = [

    new Art({
      id: 1, authorId: 301, name: 'Neon Cityscape', description: 'Vibrant digital painting.', rating: 5, creationDate: new Date('2025-10-18'),
      image: 'https://placehold.co/250x140/222/92FF71?text=Art+1',
      category: ArtCategory.CONCEPT_ART
    }),
    new Art({
      id: 2, authorId: 302, name: 'Pixel Knight', description: 'Character sprite.', rating: 4.8, creationDate: new Date('2025-07-05'),
      image: 'https://placehold.co/250x140/222/92FF71?text=Art+2',
      category: ArtCategory.PIXEL_ART
    }),
    new Art({
      id: 3, authorId: 301, name: 'Character Study', description: 'Design sketches.', rating: 4.7, creationDate: new Date('2025-10-10'),
      image: 'https://placehold.co/250x140/222/92FF71?text=Art+3',
      category: ArtCategory.CHARACTER_DESIGN
    }),
  ];
}
