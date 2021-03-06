import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Post } from '../../models/Post';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Output() newPost: EventEmitter<Post> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Post> = new EventEmitter();
  @Input() currentPost: Post;
  @Input() isEdit: boolean;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  addPost(title: string, body: string) {
    if(!title || !body) {
      alert('Please add post');
    } else {
      this.postService.savePost({ title, body } as Post).subscribe( post => {
        this.newPost.emit(post);
      });
    }
  }

  updatePost() {
    this.postService.updatePost(this.currentPost).subscribe(editedPost => {
      console.log(editedPost);
      this.isEdit = false;
      this.updatedPost.emit(editedPost);
    });
  }

}
