import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IndexedDBService } from '../services/indexeddb.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,JsonPipe,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'LocalFileSystem';
  key: string = '';
  dataToSet: string = '';

  data: any;
  
  constructor(private indexedDBService: IndexedDBService) {}

  ngOnInit(): void {
  }


  // Method to add data
  addData(): void {
    if (this.key && this.dataToSet) {
      const item = { value: this.dataToSet };
      this.indexedDBService.addItem(this.key, item).then(() => {
        console.log('Item added');
      }).catch(error => {
        console.error('Error adding item:', error);
      });
    }
  }

  // Method to fetch data
  fetchData(): void {
    if (this.key) {
      this.indexedDBService.getItem(this.key).then(item => {
        this.data = item;
        console.log('Item retrieved:', item);
      }).catch(error => {
        console.error('Error retrieving item:', error);
      });
    }
  }
}
