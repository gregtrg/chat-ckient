import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './components/not-found/page-not-found.component';
import {NavbarComponent} from './components/layouts/navbar/navbar.component';


const appRoutes: Routes = [
  {path: '**', component: PageNotFoundComponent},
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
