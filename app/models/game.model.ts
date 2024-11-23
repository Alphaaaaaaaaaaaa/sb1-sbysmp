export interface Game {
    id: string;
    title: string;
    platform: 'PS4' | 'PS5';
    size: number;
    imageUrl: string;
    prices: {
        offline: number;
        online: number;
        primary: number;
    };
    description: string;
}

export interface Platform {
    type: 'PS4' | 'PS5';
    totalStorage: number;
    usedStorage: number;
    games: Game[];
    totalSpent: number;
}

export interface CartItem {
    gameId: string;
    priceType: 'offline' | 'online' | 'primary';
    price: number;
}

export interface UserCart {
    items: CartItem[];
    total: number;
}