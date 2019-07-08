import { Component , OnInit, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { InterviewModel } from '../models/interview.model';
import { InterviewService } from '../services/interview.service';
import { Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import { mimeType } from './mime-type.validator';
import { ImageModel } from '../models/image.model';


@Component({

  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']

})

export class InterviewComponent implements OnInit, OnDestroy {

  public interviewsList: InterviewModel [] = [];
  public imageList: ImageModel [] = [];
  private subImageList: Subscription;
  private subinterviesList: Subscription;
  filesToUpload: Array<File> = [];

  dataSource = new MatTableDataSource(this.interviewsList);
  public show = false;
  public showimages = false;
  imagePreview: string;
  displayedColumns: string[] = ['firstname', 'lastname', 'age', 'schoolname'];
  imageformGroup = new FormGroup({

    image: new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
  });


constructor(private interviewService: InterviewService) {}

  ngOnInit() {

  }

  SubmitInterview(form: NgForm) {

    if (form.invalid) {

      return;
    }

    this.interviewService.NewStudentInterview(form.value.firstname, form.value.lastname, form.value.age, form.value.schoolname);

  }

  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  GetAllInterviews() {

    this.interviewService.GetAllInterviews();
    this.subinterviesList = this.interviewService.getAllInterviewsListener().subscribe(result => {

      this.interviewsList = result;
      this.dataSource = new MatTableDataSource(this.interviewsList);
      this.show = true;

    });

  }

  onImagePicked(event: Event) {


    const file = (event.target as HTMLInputElement).files[0];
    this.imageformGroup.patchValue({image: file});
    this.imageformGroup.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    this.filesToUpload.push(this.imageformGroup.value.image);
    reader.readAsDataURL(file);
  }

  UploadImage() {

    this.interviewService.NewImage(this.imageformGroup.value.image, this.filesToUpload);

  }

  GetAllImages() {

    this.interviewService.GetAllImages();
    this.subImageList = this.interviewService.getAllImageListener().subscribe(result => {

      this.imageList = result;
      this.showimages = true;
    });
  }

  ngOnDestroy() {

  }

}
