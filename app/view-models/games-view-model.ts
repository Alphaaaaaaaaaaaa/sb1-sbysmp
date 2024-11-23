import { Observable } from '@nativescript/core';
import { Game, Platform } from '../models/game.model';

export class GamesViewModel extends Observable {
    private platforms: { [key: string]: Platform } = {
        PS4: {
            type: 'PS4',
            totalStorage: 1000,
            usedStorage: 0,
            games: [],
            totalSpent: 0
        },
        PS5: {
            type: 'PS5',
            totalStorage: 825,
            usedStorage: 0,
            games: [],
            totalSpent: 0
        }
    };

    private _selectedPlatform: Platform;
    private _remainingStorage: number;

    constructor() {
        super();
        this.selectedPlatform = this.platforms.PS5;
    }

    get selectedPlatform(): Platform {
        return this._selectedPlatform;
    }

    set selectedPlatform(value: Platform) {
        if (this._selectedPlatform !== value) {
            this._selectedPlatform = value;
            this._remainingStorage = value.totalStorage - value.usedStorage;
            this.notifyPropertyChange('selectedPlatform', value);
            this.notifyPropertyChange('remainingStorage', this._remainingStorage);
        }
    }

    get remainingStorage(): number {
        return this._remainingStorage;
    }

    switchPlatform(type: 'PS4' | 'PS5') {
        if (this.selectedPlatform.type !== type) {
            this.selectedPlatform = this.platforms[type];
        }
    }

    addGame(game: Game): boolean {
        if (game.size <= this.remainingStorage) {
            this.selectedPlatform.games.push(game);
            this.selectedPlatform.usedStorage += game.size;
            this.selectedPlatform.totalSpent += game.price;
            this._remainingStorage -= game.size;
            
            this.notifyPropertyChange('selectedPlatform', this.selectedPlatform);
            this.notifyPropertyChange('remainingStorage', this._remainingStorage);
            return true;
        }
        return false;
    }

    removeGame(gameId: string): void {
        const gameIndex = this.selectedPlatform.games.findIndex(g => g.id === gameId);
        if (gameIndex !== -1) {
            const game = this.selectedPlatform.games[gameIndex];
            this.selectedPlatform.games.splice(gameIndex, 1);
            this.selectedPlatform.usedStorage -= game.size;
            this.selectedPlatform.totalSpent -= game.price;
            this._remainingStorage += game.size;
            
            this.notifyPropertyChange('selectedPlatform', this.selectedPlatform);
            this.notifyPropertyChange('remainingStorage', this._remainingStorage);
        }
    }
}