import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudyService } from './study.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.scss'],
})
export class StudyComponent implements OnInit {
  public unit: number;
  constructor(
    private studyService: StudyService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.unit = Number(activeRoute.snapshot.paramMap.get('unit'));
  }

  ngOnInit(): void {
    const subscription = this.studyService
      .fetchNextCard(this.unit)
      .subscribe((res) => {
        console.log(res);
        subscription.unsubscribe();
      });
  }

  onBackButtonClicked() {
    this.router.navigate(['/home']);
  }
}
