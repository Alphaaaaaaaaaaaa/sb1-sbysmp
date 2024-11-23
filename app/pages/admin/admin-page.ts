import { NavigatedData, Page, Observable } from '@nativescript/core';
import { DatabaseService } from '../../services/database.service';

const dbService = new DatabaseService();

export class AdminViewModel extends Observable {
    games: any[] = [];
    platform: 'PS4' | 'PS5' = 'PS5';
    newGame = {
        title: '',
        imageUrl: '',
        size: '',
        prices: {
            offline: '',
            online: '',
            primary: ''
        },
        description: ''
    };

    constructor() {
        super();
        this.loadGames();
    }

    async loadGames() {
        await dbService.init();
        this.games = await dbService.getAllGames();
        this.notifyPropertyChange('games', this.games);
    }

    async addGame() {
        const game = {
            id: Date.now().toString(),
            title: this.newGame.title,
            platform: this.platform,
            size: parseFloat(this.newGame.size),
            imageUrl: this.newGame.imageUrl,
            prices: {
                offline: parseFloat(this.newGame.prices.offline),
                online: parseFloat(this.newGame.prices.online),
                primary: parseFloat(this.newGame.prices.primary)
            },
            description: this.newGame.description
        };

        await dbService.saveGame(game);
        this.games.push(game);
        this.notifyPropertyChange('games', this.games);
        this.resetNewGame();
    }

    resetNewGame() {
        this.newGame = {
            title: '',
            imageUrl: '',
            size: '',
            prices: {
                offline: '',
                online: '',
                primary: ''
            },
            description: ''
        };
        this.notifyPropertyChange('newGame', this.newGame);
    }
}

let viewModel: AdminViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    viewModel = new AdminViewModel();
    page.bindingContext = viewModel;
}

export function onBackButtonTap(args) {
    const page = args.object.page;
    page.frame.goBack();
}

export function onSelectPS4() {
    viewModel.platform = 'PS4';
    viewModel.notifyPropertyChange('platform', viewModel.platform);
}

export function onSelectPS5() {
    viewModel.platform = 'PS5';
    viewModel.notifyPropertyChange('platform', viewModel.platform);
}

export function onAddGame() {
    viewModel.addGame();
}