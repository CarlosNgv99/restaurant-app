import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import { Dish } from '../share/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { switchMap, switchMapTo } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../share/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  comment_: Comment;
  commentForm: FormGroup;
  errMsg: string;
  dishCopy: Dish;
  comment: Comment = {
    'rating': 1,
    'comment': '',
    'author': '',
    'date': new Date().toString()
  }
  @ViewChild('fform') commentFormDirective; // Will ensure form is completely reset

  formErrors = {
    'rating': '',
    'comment': '',
    'author': '',
    'date': ''
  };

  validationMessages = {
    'rating': {
      'required': 'Rating is required.',
    },
    'comment': {
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 5 characters long.',
    },
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 25 characters.'
    }
  };

  ratingValue = 0;

  constructor(private dishService: DishService, private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder, @Inject('BaseURL') private BaseURL) {
      this.createForm();
     }

  ngOnInit(): void {
    this.dishService.getDishIds()
    .subscribe((dishIds) => this.dishIds = dishIds)
    this.route.params.pipe(switchMap((params: Params) => this.dishService.getDish(params['id']))) // Gets the id from the params sent by menu component,
    .subscribe((dish) => {
      this.dish = dish; this.dishCopy = dish;
      this.setPrevNext(dish.id)
    },
    errmsg => this.errMsg = <any>errmsg
    );

  }

  createForm(){
    this.commentForm = this.fb.group({
      'rating': [1, Validators.required],
      'comment': ['', [Validators.required, Validators.minLength(5)]],
      'author': ['', [Validators.required, Validators.maxLength(25), Validators.minLength(4)]],
      'date': ['']
    });

    this.commentForm.valueChanges
    .subscribe( data => this.onValueChanged(data));
  }

  onSubmit(){
    this.comment_ = this.commentForm.value;
    console.log(this.comment_);
    this.dishCopy.comments.push(this.comment);
    this.dishService.putDish(this.dishCopy)
    .subscribe(dish => {
      this.dish = dish; this.dishCopy = dish;
    },
    errmsg => { this.dish = null; this.dishCopy = null; this.errMsg = <any>errmsg}
    );
    this.commentForm.reset({
      rating: 0,
      comment: '',
      author: '',
      date: ''
    });
    this.commentFormDirective.resetForm();
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)% this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)% this.dishIds.length]
  }

  goBack(): void {
    this.location.back();
  }

  submitComment(){
    
  }

}
