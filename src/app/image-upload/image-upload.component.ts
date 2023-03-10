import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {


  @ViewChild("image",{static:false })
  public imageElement! :ElementRef;

  @Input("src")
  public imageSource!:string ;


  

  public imageDestination! :string ;

  private cropper!: Cropper ;

  constructor() {
      this.imageDestination = "";
  }

  @Input() 
  maxWidth : number | undefined = undefined;

  @Input("profil")
  profil: boolean = false;


  @Output()
  imageDestination2 = new EventEmitter<string>();

  @Output()
  anulujUpload = new EventEmitter<string>();

  emit() {
    
    

    this.imageDestination2.emit(this.imageDestination);
  }

  @Input()
  imageClear = false ;

  @Input()
  edit = false;

  @Output()
  deleteImage = new EventEmitter<string>();


  clear() {
    this.imageDestination = "";
    this.imageSource = "";
    this.imageClear=true;
  }

  @Input()
  width= 16;

  @Input()
  height= 9;
  

  anuluj() {

    this.anulujUpload.emit('false');
  
  }

  deleteImg() {
    this.deleteImage.emit("true");
  }

  public ngAfterViewInit() {
      this.cropper = new Cropper(this.imageElement.nativeElement, {
        zoomable : false ,
        scalable : false ,
        aspectRatio : this.width / this.height , 
        viewMode: 1,
      //  cropBoxResizable: false,
       // minCanvasWidth:200,
        
      
        
        crop : () => {
            const canvas = this.cropper.getCroppedCanvas();
          //  canvas.width = 10;
          //  canvas.height = 10 ;
          let context = canvas.getContext("2d") 
          //context.heig
          this.imageDestination = canvas.toDataURL("image/jpeg",0.85);
          
          
        }
      })
  }

}
