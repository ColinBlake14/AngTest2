import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms"
import { MessageModel, UserModel } from "./app.component.model";
import { ApiService } from "./shared/api.service";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  feedbackForm!: FormGroup
  siteKey: string = "6LfBbkIcAAAAAC2FFsTY5HG8_82X6y2urkcnR8kA"
  userModelObj: UserModel = new UserModel()
  messageModelObj: MessageModel = new MessageModel()
  topicList: any = []
  usersData: UserModel[] = []
  num: number = 0;
  double: boolean = false
  isHidden: boolean = false

  myUsersSub! : Subscription
  myTopicsSub! : Subscription
  myPostUserSub! : Subscription
  myPostCommentSub! : Subscription

  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.feedbackForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
      phone: new FormControl('',
        Validators.required
      ),
      prob: new FormControl('tec'),
      disc: new FormControl('', Validators.required),
      recaptcha: ['', Validators.required]
    })
    this.getAllTopics()
    this.getAllUsers()
  }

  postUserData() {
    this.userModelObj.UserName = this.feedbackForm.value.name
    this.userModelObj.UserEmail = this.feedbackForm.value.email
    this.userModelObj.UserPhone = this.feedbackForm.value.phone

    this.myPostUserSub = this.api.postUser(this.userModelObj)
      .subscribe(res=> {
        console.log(res)
      },
      err=> {
        alert("You died (from postUser")
      })
  }

  postComment() {
    this.messageModelObj.TopicId = this.feedbackForm.value.prob
    this.messageModelObj.UserId = this.feedbackForm.value.email
    this.messageModelObj.MessageValue = this.feedbackForm.value.disc

    this.myPostCommentSub = this.api.postComment(this.messageModelObj)
      .subscribe(res=> {
          console.log(res)
        },
        err=> {
          alert("You died (from post Comment)")
        })
  }

  getAllTopics() {
    this.myTopicsSub = this.api.getTopicList().subscribe(data => {
      this.topicList = data
    })
  }

  getAllUsers() {
    this.myUsersSub = this.api.getUserList().subscribe(data => {
      this.usersData = data
      console.log("UsersData1: ", this.usersData)
    })
  }

  ngOnDestroy() {
    if (this.myPostCommentSub) {
      this.myPostCommentSub.unsubscribe()
    }
    if (this.myPostUserSub) {
      this.myPostUserSub.unsubscribe()
    }
    if (this.myUsersSub) {
      this.myUsersSub.unsubscribe()
    }
    if (this.myTopicsSub) {
      this.myTopicsSub.unsubscribe()
    }
  }

  submit() {
    if (this.feedbackForm.valid) {
      console.log('Form submited', this.feedbackForm)
      const formData = {...this.feedbackForm.value} 

      this.double = false

      for (this.num = 0; this.num < this.usersData.length; this.num++) {
        if ((this.usersData[this.num].UserPhone === formData.phone) && (this.usersData[this.num].UserEmail === formData.email)) {
          alert('Такая комбинация Email + Телефон уже зарегистрирована')
          this.double = true
          break
        }
      }
      if (!this.double) {
        this.postUserData()
        this.postComment()
        alert('Сообщение успешно отправлено!')
        this.feedbackForm.reset()
        this.isHidden = true
        this.router.navigate(['formvalue'])
      }
    }
 }
}
