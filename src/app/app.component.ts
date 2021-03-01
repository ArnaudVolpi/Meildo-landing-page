import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contactForm;
  showSnack = false;

  /* ------- Contact ------- */
  constructor(public fb: FormBuilder, private apollo: Apollo) { }
  ngOnInit() {
    this.contactForm = this.fb.group({
      email: new FormControl(''),
    })
  }
  registerNewsLetter() {
    this.apollo.mutate({
      mutation: gql`
        mutation addToMailingList($email: String!) {
          addToMailingList(email: $email) {
          email
          }
        }
      `,
      variables: {
        email: this.contactForm.controls['email'].value,
      },
    }).subscribe(() => {
      this.contactForm.reset();
      this.showSnack = true;
    });
    setTimeout(() => {
      this.showSnack = false;
    }, 3000);
  }



  /* ------- Carousel ------- */
  isChecked = false;
  closeNavbarExpand() {
    this.isChecked = false;
  }

  /* ------- Carousel ------- */
  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;
  curr_index = 2;
  car_data = [
    { index: 0, url: "" },
    { index: 1, url: "" },
    { index: 2, url: "" },
    { index: 3, url: "" },
    { index: 4, url: "" },
    { index: 5, url: "" },
    { index: 6, url: "" },
    { index: 7, url: "" },
    { index: 8, url: "" },

  ]
  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveTo(index, min, max) {
    if (index < min) {
      this.ds.moveTo(min);
      this.curr_index = min;
    } else if (index > max) {
      this.ds.moveTo(max);
      this.curr_index = max;
    } else {
      this.ds.moveTo(index);
      this.curr_index = index;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.ds.moveTo(this.curr_index);
      this.ds.dragDisabled = true

      this.ds.indexChanged.subscribe(() => {
        this.curr_index = this.ds.currIndex;
      })

    }, 0);
  }

  /* ------- Smooth Scroll ------- */
  scrollToElement($element): void {
    this.closeNavbarExpand();
    $element.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }


}
