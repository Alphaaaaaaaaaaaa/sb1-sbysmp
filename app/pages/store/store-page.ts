import { NavigatedData, Page, Observable } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';

const dbService = new DatabaseService();

export class StoreViewModel extends Observable {
    games: any[] = [];
    platform: 'PS4' | 'PS5' = 'PS5';
    cart: any[] = [];
    cartTotal: number = 0;

    constructor() {
        super();
        this.loadGames();
    }

    async loadGames() {
        try {
            await dbService.init();
            this.games = await dbService.getAllGames();
            this.notifyPropertyChange('games', this.games);
            this.updateFilteredGames();
        } catch (error) {
            console.error('Error loading games:', error);
        }
    }

    get filteredGames() {
        return this.games.filter(game => game.platform === this.platform);
    }

    addToCart(game: any, priceType: string) {
        this.cart.push({
            game,
            priceType,
            price: game.prices[priceType],
            index: this.cart.length
        });
        this.cartTotal += game.prices[priceType];
        this.notifyPropertyChange('cart', this.cart);
        this.notifyPropertyChange('cartTotal', this.cartTotal);
    }

    updateFilteredGames() {
        this.notifyPropertyChange('filteredGames', this.filteredGames);
    }
}

let viewModel: StoreViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    viewModel = new StoreViewModel();
    page.bindingContext = viewModel;
}

export function onBackButtonTap(args) {
    const page = args.object.page;
    page.frame.goBack();
}

export function onSelectPS4() {
    viewModel.platform = 'PS4';
    viewModel.updateFilteredGames();
}

export function onSelectPS5() {
    viewModel.platform = 'PS5';
    viewModel.updateFilteredGames();
}

export function onAddToCart(args) {
    const button = args.object;
    const game = button.bindingContext;
    const priceType = button.text.toLowerCase().split(' ')[0];
    viewModel.addToCart(game, priceType);
}

export function onViewCart(args) {
    const page = args.object.page;
    page.frame.navigate({
        moduleName: "pages/cart/cart-page",
        context: {
            cart: viewModel.cart,
            cartTotal: viewModel.cartTotal
        }
    });
}