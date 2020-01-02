import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipes-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipes-detail/recipe-detail.component';

import { RecipesResolverService } from './recipes-resolver.service';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuardService], children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component: RecipeEditComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
  ]
 })
export class RecipesRoutingModule {

}
