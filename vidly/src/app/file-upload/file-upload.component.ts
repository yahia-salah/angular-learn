import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  fileName = '';
  @Input() accept = '';
  @Output() fileSelected = new EventEmitter<FileSelectedEventArgs>();

  constructor() {}

  onFileSelected($event: any) {
    const file: File = $event.target.files[0];

    if (file) {
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file);

      this.fileSelected.emit({ file });
      //const upload$ = this.http.post('/api/file-upload', formData);

      //upload$.subscribe();
    }
  }

  ngOnInit(): void {}
}

export interface FileSelectedEventArgs {
  file: File;
}
