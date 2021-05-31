import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  contactMethods = [
    { id: 10, name: 'Email' },
    { id: 20, name: 'Phone' },
  ];

  submit(contactData: any) {
    console.log(contactData);
    let jsonObj = {
      firstName: contactData.personalInfo.firstName,
      comment: contactData.comment,
    };
    console.log(jsonObj);
  }
}
