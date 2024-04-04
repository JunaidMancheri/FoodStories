import { Injectable } from '@angular/core';
import { IPost } from '@food-stories/common/typings';
import { BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root'})
export class NewPostEventsService {
  private newPostSubject = new BehaviorSubject<IPost>({} as IPost);
  newPost$ = this.newPostSubject.asObservable();

  setNewPost(newPost: IPost) {
      this.newPostSubject.next(newPost);
  }
}