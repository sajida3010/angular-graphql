import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GithubListComponent } from './github-list/github-list.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'list', component: GithubListComponent },
  { path: 'list/:owner/:repo', component: DetailViewComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
