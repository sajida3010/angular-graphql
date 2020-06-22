import { Component, OnInit } from '@angular/core';
import {Apollo, QueryRef} from 'apollo-angular';

import {githubPublicListQuery} from '../query';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-list',
  templateUrl: './github-list.component.html',
  styleUrls: ['./github-list.component.css']
})

export class GithubListComponent implements OnInit {
  loading = true;
  error: any;
  edges: any[];
  feedQuery: QueryRef<any>;
  static cursor: any = "Y3Vyc29yOjE=";
  feed: any;
  prevScrollHeight: any;

  constructor(
    private apollo: Apollo, 
    private route: Router
  ) { }

  ngOnInit(): void {
    this.feedQuery = this.apollo
      .watchQuery<any>({
      query: githubPublicListQuery,
        variables: {
          "queryString": "is:public"
        }
      });
      this.feed = this.feedQuery
      .valueChanges.subscribe(result => {
        // console.log('res',result);
        this.edges = result.data['search']['edges'];
        this.loading = false;
      });
  }

  ngAfterViewChecked(): void {
    document.documentElement.scrollTop = this.prevScrollHeight;
  }

  fetchMore() {
    this.loading = true;
    this.prevScrollHeight = document.documentElement.scrollTop;
    this.feedQuery.fetchMore({
      query: githubPublicListQuery,
      variables: {
        "queryString": "is:public",
        cursor: GithubListComponent.cursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        // console.log('GithubListComponent.cursor', GithubListComponent.cursor)
        // console.log('fetchmore', fetchMoreResult);
        // console.log('prev', prev);
        const previousEntry = prev;
        const newEdges = fetchMoreResult['search']['edges'];

        // update internal reference to cursor
        GithubListComponent.cursor = fetchMoreResult['search']['edges'][19]['cursor'];
        this.edges = [...this.edges, ...newEdges];

        this.loading = false;
        return {
          rateLimit: previousEntry.rateLimit,
          search: previousEntry.search,
          edges: this.edges
        };
      },
    });
  }

  gotoDetailView(repoName, owner) {
    this.route.navigate(['/list', owner, repoName]);
  }

  linkClick() {
    event.stopPropagation();
  }

}
