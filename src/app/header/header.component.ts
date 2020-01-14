import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

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

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  onSaveData() {
    this.saveBtnTxt = 'Loading...';
    this.dataStorageService.storeRecipes().subscribe(
      response => {
        this.saveBtnTxt = 'Save Recipes';
        window.alert('recipes saved');
    });
  }

  onFetchData() {
    this.fetchBtnTxt = 'Loading...';
    this.dataStorageService.fetchRecipes().subscribe(
      data => {
        this.fetchBtnTxt = 'Fetch Recipes';
      }
    );
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
