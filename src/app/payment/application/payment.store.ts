import {computed, Injectable, Signal, signal} from '@angular/core';
import {ShoppingCart} from '../domain/model/shopping-cart.entity';
import {PaymentApi} from '../infrastructure/services/payment-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PaymentStore {
  private readonly shoppingCartsSignal = signal<ShoppingCart[]>([]);
  readonly shoppingCarts = this.shoppingCartsSignal.asReadonly();

  readonly shoppingCartCount = computed(() => this.shoppingCarts().length);

  private readonly loadingSignal = signal<boolean>(false);
  readonly loading = this.loadingSignal.asReadonly();

  private readonly errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();

  private _currentShoppingCart: ShoppingCart | undefined = undefined;

  constructor(private paymentApi: PaymentApi) {
    this.loadShoppingCarts();
  }

  get currentShoppingCart(): ShoppingCart | undefined {
    return this._currentShoppingCart;
  }
  set currentShoppingCart(value: ShoppingCart) {
    this._currentShoppingCart = value;
  }

  private formatError(error: any, fallback: string): string {
    if (error instanceof Error) {
      return error.message.includes('Resource not found') ? '${fallback}: Not found' : error.message;
    }
    return fallback;
  }

  private loadShoppingCarts(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.getShoppingCarts().pipe(takeUntilDestroyed()).subscribe({
      next: shoppingCarts => {
        console.log(shoppingCarts);
        this.shoppingCartsSignal.set(shoppingCarts);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load shopping carts'));
        this.loadingSignal.set(false);
      }
    });
  }

  getShoppingCartById(id: number): Signal<ShoppingCart | undefined>{
    return computed(() => id? this.shoppingCarts().find(s => s.id === id): undefined);
  }

  addShoppingCart(shoppingCart: ShoppingCart): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.createShoppingCart(shoppingCart).pipe(retry(2)).subscribe({
      next: createdShoppingCart => {
        this.shoppingCartsSignal.update(shoppingCarts => [...shoppingCarts, createdShoppingCart]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create shopping cart'));
        this.loadingSignal.set(false);
      }
    });
  }

  updateShoppingCart(updatedShoppingCart: ShoppingCart): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.updateShoppingCart(updatedShoppingCart).pipe(retry(2)).subscribe({
      next: shoppingCart => {
        this.shoppingCartsSignal.update(shoppingCarts => shoppingCarts.map(s => s.id === shoppingCart.id ? shoppingCart : s));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update shopping cart'));
        this.loadingSignal.set(false);
      }
    });
  }

  deleteShoppingCart(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentApi.deleteShoppingCart(id).pipe(retry(2)).subscribe({
      next: () => {
        this.shoppingCartsSignal.update(shoppingCarts => shoppingCarts.filter((s => s.id !== id)));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete shopping cart'));
        this.loadingSignal.set(false);
      }
    });
  }

}
