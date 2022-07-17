import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ActualHomeComponent } from "./actual-home/actual-home.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { HomeComponent } from "./home/home.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
    { path: "", component: HomeComponent, children: [
        { path: "home", component: ActualHomeComponent, pathMatch: 'full' },
        { path: "search-movie", component: SearchComponent },
        { path: "favourites", component: FavouritesComponent },
        { path: "coming-soon", component: ComingSoonComponent },
        { path: "settings", component: ProfileSettingsComponent }
    ]},
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class UserRoutingModule {}
