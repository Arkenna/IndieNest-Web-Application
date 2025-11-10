import {Component, computed, inject, Signal} from '@angular/core';
import {PaymentStore} from '../../../application/payment.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {Project} from '../../../../project/application/project.store';
import {Game} from '../../../../project/domain/model/game.entity';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {TranslateModule, TranslatePipe} from '@ngx-translate/core';
import {Router, RouterLink} from '@angular/router';

interface CartItemDetail {
  game: Game;
}

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    MatButtonModule,
    MatIconModule,
    MatIcon,
    TranslateModule,
    TranslatePipe,
    RouterLink
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {

  private router = inject(Router);
  readonly paymentStore = inject(PaymentStore);
  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);
  readonly projectStore = inject(Project);

  currentProfile = computed(() =>
    this.profileStore.profiles().find(p => p.accountId === this.iamStore.currentAccount?.id)
  );
  currentCart = computed(() => {
    const profile = this.currentProfile();
    return profile ? this.paymentStore.getCartByProfileId(profile.id)() : undefined;
  });

  cartItemsDetail = computed<CartItemDetail[]>(() => {
    const cart = this.currentCart();

    if (!cart || !cart.gameIds) return [];

    return cart.gameIds
      .map(gameId => this.projectStore.getGameById(gameId)())
      .filter((game): game is Game => game !== undefined)
      .map(game => ({ game }));
  });

  totalPrice = computed(() => this.currentCart()?.price ?? 0);


  removeItem(gameId: number, gamePrice: number): void {
    const profile = this.currentProfile();

    if (profile && this.iamStore.currentAccount) {
      this.paymentStore.removeGameFromCart(profile.id, gameId, gamePrice);
    } else {
      this.router.navigate(['/log-in']).then();
    }
  }

  checkout(): void {
    if (!this.iamStore.currentAccount) {
      this.router.navigate(['/log-in']).then();
      return;
    }
    if (this.totalPrice() > 0) {

    }
  }
}
