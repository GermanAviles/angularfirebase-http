import { Routes, RouterModule } from '@angular/router';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroeComponent } from './components/heroes/heroe.component';
//import { PageNotFoundComponent } from './';

const routes: Routes = [
    { path: '', component: HeroesComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroe/:id', component: HeroeComponent },
    { path: '**', component: HeroeComponent },

    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [
              RouterModule.forChild(routes), 
              RouterModule.forRoot(routes)
            ],
    exports: [RouterModule]
})
export class AppRountingModule {}
//export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);