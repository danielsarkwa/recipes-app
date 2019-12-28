import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipes-start/recipe-start.component';
import { RecipeDetailComponent } from './recipes/recipes-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

const AppRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
    { path: ':id/edit', component: RecipeEditComponent }
  ]},
  { path: 'shopping-list', component: ShoppingListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
