import { Sqlite } from 'nativescript-sqlite';

export class DatabaseService {
    private database: Sqlite;

    async init() {
        try {
            this.database = await new Sqlite('playstation.db');
            await this.createTables();
            await this.insertSampleData(); // Add sample data for testing
        } catch (error) {
            console.error('Database initialization error:', error);
        }
    }

    private async createTables() {
        await this.database.execSQL(`
            CREATE TABLE IF NOT EXISTS games (
                id TEXT PRIMARY KEY,
                title TEXT,
                platform TEXT,
                size NUMBER,
                imageUrl TEXT,
                offlinePrice NUMBER,
                onlinePrice NUMBER,
                primaryPrice NUMBER,
                description TEXT
            )
        `);
    }

    private async insertSampleData() {
        const sampleGames = [
            {
                id: '1',
                title: 'Spider-Man 2',
                platform: 'PS5',
                size: 125,
                imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202306/1219/60eca3ac155f0f77092aa4c20c32be6b32d8cd94f6df6c2b.png',
                prices: {
                    offline: 59.99,
                    online: 69.99,
                    primary: 79.99
                },
                description: 'Be greater together in Marvel\'s Spider-Man 2 on PS5.'
            },
            {
                id: '2',
                title: 'God of War Ragnarök',
                platform: 'PS4',
                size: 118.5,
                imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
                prices: {
                    offline: 49.99,
                    online: 59.99,
                    primary: 69.99
                },
                description: 'Embark on an epic and heartfelt journey as Kratos and Atreus struggle with holding on and letting go.'
            }
        ];

        for (const game of sampleGames) {
            await this.saveGame(game);
        }
    }

    async saveGame(game: any) {
        const query = `
            INSERT OR REPLACE INTO games 
            (id, title, platform, size, imageUrl, offlinePrice, onlinePrice, primaryPrice, description)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        await this.database.execSQL(query, [
            game.id,
            game.title,
            game.platform,
            game.size,
            game.imageUrl,
            game.prices.offline,
            game.prices.online,
            game.prices.primary,
            game.description
        ]);
    }

    async getAllGames(): Promise<any[]> {
        const games = await this.database.all('SELECT * FROM games');
        return games.map(game => ({
            id: game[0],
            title: game[1],
            platform: game[2],
            size: game[3],
            imageUrl: game[4],
            prices: {
                offline: game[5],
                online: game[6],
                primary: game[7]
            },
            description: game[8]
        }));
    }
}