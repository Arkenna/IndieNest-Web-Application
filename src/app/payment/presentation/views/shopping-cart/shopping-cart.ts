import {Component, computed, inject} from '@angular/core';
import {PaymentStore} from '../../../application/payment.store';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {IamStore} from '../../../../iam/application/iam.store';
import {ProfileStore} from '../../../../profile/application/profile.store';
import {Router} from '@angular/router';
import {Project} from '../../../../project/application/project.store';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent,
    MatButton, MatIcon, CurrencyPipe, TranslatePipe
  ],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css'
})
export class ShoppingCart {
  readonly paymentStore = inject(PaymentStore);
  readonly iamStore = inject(IamStore);
  readonly profileStore = inject(ProfileStore);
  readonly projectStore = inject(Project);
  private router = inject(Router);

  cart = computed(() => {
    const account = this.iamStore.currentAccount;
    if (!account) return null;

    const profile = this.profileStore.profiles().find(p => p.accountId === account.id);
    if (!profile) return null;

    return this.paymentStore.getCartByProfileId(profile.id)() || null;
  });
  cartItems = computed(() => this.cart()?.gameIds || []);

  cartItemsDetail = computed(() => {
    const ids = this.cartItems();
    const allGames = this.projectStore.games();

    return ids.map(id => {
      const game = allGames.find(g => g.id === id);
      return game ? { game } : null;
    }).filter(item => item !== null);
  });

  totalPrice = computed(() => {
    return this.cart()?.price || 0;
  });

  checkout() {
    console.log('Proceeding to checkout...');
  }

  removeItem(gameId: number, price: number) {
    const account = this.iamStore.currentAccount;
    if (!account) return;

    const profile = this.profileStore.profiles().find(p => p.accountId === account.id);
    if (profile) {
      this.paymentStore.removeGameFromCart(profile.id, gameId, price);
    }
  }
}
