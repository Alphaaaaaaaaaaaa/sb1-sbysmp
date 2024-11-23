import { NavigatedData, Page } from '@nativescript/core';
import { GamesViewModel } from '../../view-models/games-view-model';

let viewModel: GamesViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    viewModel = new GamesViewModel();
    page.bindingContext = viewModel;
}

export function onSelectPS4(args) {
    viewModel.switchPlatform('PS4');
}

export function onSelectPS5(args) {
    viewModel.switchPlatform('PS5');
}

export function onNavigateToStore(args) {
    const page = args.object.page;
    page.frame.navigate({
        moduleName: "pages/store/store-page",
        context: viewModel
    });
}

export function onNavigateToAdmin(args) {
    const page = args.object.page;
    page.frame.navigate({
        moduleName: "pages/admin/admin-page"
    });
}