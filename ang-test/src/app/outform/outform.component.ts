import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel, MessageModel } from '../app.component.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-outform',
  templateUrl: './outform.component.html',
  styleUrls: ['./outform.component.scss']
})
export class OutformComponent implements OnInit {

  feedbackFormValue!: FormGroup
  usersData: UserModel[] = []
  feedbackData: MessageModel[] = []
  num: number = 0
  max: number = 0
  maxnum: number = 0

  myUsersSub! : Subscription
  myCommentsSub! : Subscription

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.feedbackFormValue = this.formBuilder.group({
      name: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      disc: new FormControl('')
    })
    this.getAllFeedback()
    this.getAllUsers()
  }

  getAllUsers() {
    this.myUsersSub = this.api.getUserList().subscribe(data => {
      this.usersData = data
      for (this.num = 0; this.num < this.usersData.length; this.num++) {
        if (this.usersData[this.num].UserId > this.max) {
          this.max = this.usersData[this.num].UserId
          this.maxnum = this.num
        }
      }
      this.feedbackFormValue.controls['name'].setValue(this.usersData[this.maxnum].UserName)
      this.feedbackFormValue.controls['email'].setValue(this.usersData[this.maxnum].UserEmail)
      this.feedbackFormValue.controls['phone'].setValue(this.usersData[this.maxnum].UserPhone)
      this.feedbackFormValue.controls['disc'].setValue(this.feedbackData[this.maxnum].MessageValue)
    })
  }

  getAllFeedback() {
    this.myCommentsSub = this.api.getFeedbackList().subscribe(data => {
      this.feedbackData = data
      console.log('FeedbackData ', this.feedbackData)
    })
  }

  ngOnDestroy() {
    if (this.myUsersSub) {
      this.myUsersSub.unsubscribe()
    }
    if (this.myCommentsSub) {
      this.myCommentsSub.unsubscribe()
    }
  }

  onClick() {
    this.router.navigate(['formvalid'])
  }
}
