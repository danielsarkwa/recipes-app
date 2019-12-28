import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
        .put(
          'https://recipes-app-1540b.firebaseio.com/recipes.json',
          recipes
          )
        .subscribe(response => {
          console.log(response);
        });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipes-app-1540b.firebaseio.com/recipes.json')
        .pipe(
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
