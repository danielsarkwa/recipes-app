import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipesActions from '../recipes/store/recipes.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  isLoading: boolean;
  saveBtnTxt = 'Save Recipes';
  fetchBtnTxt = 'Fetch Recipes';

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  onSaveData() {
    this.saveBtnTxt = 'Loading...';
    this.store.dispatch(new RecipesActions.StoreRecipes());
    this.saveBtnTxt = 'Save Recipes';
    window.alert('recipes saved');
  }

  onFetchData() {
    this.fetchBtnTxt = 'Loading...';
    this.store.dispatch(new RecipesActions.FetchRecipes());
    this.fetchBtnTxt = 'Fetch Recipes';
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.Logout());
  }

  ngOnInit() {
    this.userSub = this.store
    .select('auth')
    .pipe(map(authState => authState.user))
    .subscribe(user => {
      this.isAuthenticated = !!user;
     }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
