import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { InterviewModel } from '../models/interview.model';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { ImageModel } from '../models/image.model';


const backendUrl = environment.backendUrl;

@Injectable({providedIn: 'root'})
export class InterviewService {

  private ImageList: ImageModel [] = [];
  private UpdatedImageList = new Subject<ImageModel[]>();
  private InterviewsList: InterviewModel [] = [];
  private UpdatedInterviewsList = new Subject<InterviewModel[]>();
  public i = 0;

constructor(private http: HttpClient) {}




NewStudentInterview(firstname: string, lastname: string, age: string, schoolname: string ) {

  const interviewInfo = {firstname, lastname, age, schoolname};
  this.http.post(backendUrl + '/interviews' , interviewInfo).subscribe(result => {

  });

}

NewImage(image: File, images: Array<File>) {

  const imagesData = new FormData();

  for (this.i = 0; this.i < images.length; this.i++ ) {
        imagesData.append('images[]', images[this.i], images[this.i]['name']);
    }

  this.http.post(backendUrl + '/images', imagesData).subscribe(result => {


  });

}

GetAllInterviews() {

  this.http.get<{interviews: any}>(backendUrl + '/interviews')
  .pipe(map((responseInterviews) => {
    return responseInterviews.interviews.map(interview => {
      return {
        firstname: interview.firstname,
        lastname: interview.lastname,
        age: interview.age,
        schoolname: interview.schoolname
      };
    });
  })).subscribe(transformedData => {

      this.InterviewsList = transformedData;
      this.UpdatedInterviewsList.next([...this.InterviewsList]);

  });
}

GetAllImages() {

  this.http.get<{images: any}>(backendUrl + '/images')
  .pipe(map((responseImages) => {
    return responseImages.images.map(image => {
      return {
        id: image._id,
        image: image.image
      };
    });
  })).subscribe(trasnformedData => {

    this.ImageList = trasnformedData;
    this.UpdatedImageList.next([...this.ImageList]);

  });
}


getAllInterviewsListener() {

  return this.UpdatedInterviewsList.asObservable();
}

getAllImageListener() {

  return this.UpdatedImageList.asObservable();
}



}
