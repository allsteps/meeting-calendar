import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.scss']
})
export class ListHeaderComponent implements OnInit {
  @Input() headerName: string;
  @Input() buttonName: string;
  @Output() buttonClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Emits when called.
   */
  public clickButton(): void {
    this.buttonClicked.emit();
  }
}
