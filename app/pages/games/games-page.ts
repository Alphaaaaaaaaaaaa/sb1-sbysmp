import { NavigatedData, Page, alert, prompt } from '@nativescript/core';
import { GamesViewModel } from '../../view-models/games-view-model';

let viewModel: GamesViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    viewModel = args.context;
    page.bindingContext = viewModel;
}

export function onShowAddGameDialog(args) {
    prompt({
        title: "Add New Game",
        message: "Enter game title",
        okButtonText: "Add",
        cancelButtonText: "Cancel",
        inputType: "text",
        defaultText: ""
    }).then(r => {
        if (r.result) {
            const game = {
                id: Date.now().toString(),
                title: r.text,
                platform: viewModel.selectedPlatform.type,
                size: Math.floor(Math.random() * 100) + 20,
                price: Math.floor(Math.random() * 40) + 20
            };

            if (viewModel.addGame(game)) {
                alert({
                    title: "Success",
                    message: "Game added successfully!",
                    okButtonText: "OK"
                });
            } else {
                alert({
                    title: "Error",
                    message: "Not enough storage space!",
                    okButtonText: "OK"
                });
            }
        }
    });
}

export function onRemoveGame(args) {
    const game = args.object.bindingContext;
    
    alert({
        title: "Confirm Removal",
        message: `Are you sure you want to remove ${game.title}?`,
        okButtonText: "Yes",
        cancelButtonText: "No"
    }).then(result => {
        if (result) {
            viewModel.removeGame(game.id);
        }
    });
}