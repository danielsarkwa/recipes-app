import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private authService: AuthService,
              private recipeService: RecipeService) {}

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
        this.recipeService.setRecipes(recipes);
      })
     );
  }
}
