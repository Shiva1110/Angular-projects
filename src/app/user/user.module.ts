import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { UserRoutingModule } from './user-routing.module';
import { SearchComponent } from './search/search.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ActualHomeComponent } from './actual-home/actual-home.component';
import { ServicesModule } from '../services/services.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    FavouritesComponent,
    ComingSoonComponent,
    ProfileSettingsComponent,
    ActualHomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    UserRoutingModule,
    ServicesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }
