import { Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  filterText: string = '';
  constructor(private shareDataService:ShareDataService){ }

  ngOnInit(): void {
  }
  changeFilterText(){
    this.shareDataService.setProductFilterText(this.filterText)
  }
}
