import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from "@angular/common/http";
import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
import { HttpLinkModule, HttpLink } from "apollo-angular-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubListComponent } from './github-list/github-list.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const auth = setContext((operation, context) => ({
  headers: {
    Authorization: `Bearer <token>`, // add your github token here
    Accept: 'charset=utf-8',
  },
}));

@NgModule({
  declarations: [
    AppComponent,
    GithubListComponent,
    DetailViewComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      return {
        cache: new InMemoryCache(),
        link: ApolloLink.from([auth, httpLink.create({ uri: "https://api.github.com/graphql"})])
      };
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})

export class AppModule { }
