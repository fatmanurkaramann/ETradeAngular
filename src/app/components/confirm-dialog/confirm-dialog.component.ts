import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Output() onConfirmed =new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit(): void {
  }

  confirm(){
    this.onConfirmed.emit();
  }
}
