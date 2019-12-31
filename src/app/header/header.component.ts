import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

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
              private authService: AuthService) {}

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
    this.authService.logout();
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
     }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
