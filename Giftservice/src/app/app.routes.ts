import { Routes } from '@angular/router';
import { ModuloUbicacionComponent } from './components/country/modulo-ubicacion/modulo-ubicacion.component';
import { CountryComponent } from './components/country/country.component';
import { CreateCountryComponent } from './components/country/create-country/create-country.component';
import { CityComponent } from './components/country/city/city.component';
import { InsertCityComponent } from './components/country/city/insert-city/insert-city.component';

export const routes: Routes = [
    {
        path: 'moduloUbicacion', component: ModuloUbicacionComponent,
    children: [
      {
        path: 'paises', component: CountryComponent,
        children: [{ path: 'registro', component: CreateCountryComponent }]
      },
      {
        path: 'ciudades', component: CityComponent,
        children: [{ path: 'registro', component: InsertCityComponent }]
      },
    ]
    }
];
