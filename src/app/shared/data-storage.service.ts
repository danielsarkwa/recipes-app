import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

import * as fromApp from '../store/app.reducer';
import * as RecipesAction from '../recipes/store/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put('https://recipes-app-1540b.firebaseio.com/recipes.json', recipes);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://recipes-app-1540b.firebaseio.com/recipes.json',
     ).pipe(
      map(recipeItem => {
        return recipeItem.map(recipeDetails => {
          return {...recipeDetails, ingredients : recipeDetails.ingredients ? recipeDetails.ingredients : []};
        });
      }),
      tap(recipes => {
        this.store.dispatch(new RecipesAction.SetRecipes(recipes));
        // this.recipeService.setRecipes(recipes);
      })
     );
  }
}
