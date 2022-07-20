import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../guards/auth.guard";
import { ActualHomeComponent } from "./actual-home/actual-home.component";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { FavouritesComponent } from "./favourites/favourites.component";
import { ProfileSettingsComponent } from "./profile-settings/profile-settings.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
    { path: "home", component: ActualHomeComponent, pathMatch: 'full', canActivate: [AuthGuard]},
    { path: "search-movie", component: SearchComponent, canActivate: [AuthGuard] },
    { path: "favourites", component: FavouritesComponent, canActivate: [AuthGuard] },
    { path: "coming-soon", component: ComingSoonComponent, canActivate: [AuthGuard] },
    { path: "settings", component: ProfileSettingsComponent, canActivate: [AuthGuard] }
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class UserRoutingModule {}
