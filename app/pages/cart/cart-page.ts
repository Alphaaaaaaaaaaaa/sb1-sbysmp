import { NavigatedData, Page, Observable, alert } from '@nativescript/core';

export class CartViewModel extends Observable {
    cart: any[];
    cartTotal: number;

    constructor(cart: any[], cartTotal: number) {
        super();
        this.cart = cart;
        this.cartTotal = cartTotal;
    }

    removeFromCart(index: number) {
        const item = this.cart[index];
        this.cartTotal -= item.price;
        this.cart.splice(index, 1);
        this.notifyPropertyChange('cart', this.cart);
        this.notifyPropertyChange('cartTotal', this.cartTotal);
    }
}

let viewModel: CartViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    const context = args.context;
    viewModel = new CartViewModel(context.cart, context.cartTotal);
    page.bindingContext = viewModel;
}

export function onBackButtonTap(args) {
    const page = args.object.page;
    page.frame.goBack();
}

export function onRemoveFromCart(args) {
    const index = args.object.bindingContext.index;
    viewModel.removeFromCart(index);
}

export function onCheckout() {
    alert({
        title: "Success",
        message: "Thank you for your purchase!",
        okButtonText: "OK"
    }).then(() => {
        viewModel.cart = [];
        viewModel.cartTotal = 0;
        viewModel.notifyPropertyChange('cart', viewModel.cart);
        viewModel.notifyPropertyChange('cartTotal', viewModel.cartTotal);
    });
}