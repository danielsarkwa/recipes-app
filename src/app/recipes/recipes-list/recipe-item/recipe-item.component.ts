import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() index: number;

  constructor() { }

  ngOnInit() { }
}
/**
 * this is the component that displays a single recipe and contains all the properties of a single component
 * data passed to this comp is from the parent component --> recipe list
 */
