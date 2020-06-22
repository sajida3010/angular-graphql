import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
const $ = require('jquery');


@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.css']
})
export class DetailViewComponent implements OnInit {
  contributorList = [];
  owner: string;
  repo: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(param => {
      this.owner = param['params']['owner'];
      this.repo = param['params']['repo'];
    });
    let contributorArr = [];
    const h = new HttpHeaders();
    h.append('Accept', 'text/plain');
    h.append('content-type', 'text/plain');
    this.http.get(`https://github.com/${this.owner}/${this.repo}/issues/show_menu_content?partial=issues%2Ffilters%2Fauthors_content&q=is%3Aissue+is%3Aopen`,
        {responseType: 'text'})
        .subscribe(response => {
          $('<div></div>').html(response).find('a').each(function(l) {
            const accName = decodeURIComponent($(this).attr('href').split('%3A')[3]);
            const profileImage = $(this).find('img').attr('src');
            const ownerName = $(this).find('span').text();
            contributorArr.push({'accName': accName, 'img': profileImage, 'owner': ownerName});
          });
          this.contributorList = contributorArr;
    });
  }

  goToLink(account) {
    const acc = encodeURIComponent(account);
    window.open(`https://github.com/${acc}`);
  }

}
