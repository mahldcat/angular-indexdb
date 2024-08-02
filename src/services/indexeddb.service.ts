import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'MyDatabase';
  private storeName = 'MyStore';

  constructor() {
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName);
      }
    };

    request.onsuccess = (event: any) => {
      console.log('Database initialized');
    };

    request.onerror = (event: any) => {
      console.error('Database error:', event.target.error);
    };
  }

  addItem(key: string, data: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(this.storeName, 'readwrite');
        const store = transaction.objectStore(this.storeName);

        const putRequest = store.put(data, key);

        putRequest.onsuccess = () => {
          resolve();
        };

        putRequest.onerror = (e: any) => {
          reject(e.target.error);
        };
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }

  getItem(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName);

      request.onsuccess = (event: any) => {
        const db = event.target.result;
        const transaction = db.transaction(this.storeName, 'readonly');
        const store = transaction.objectStore(this.storeName);

        const getRequest = store.get(key);

        getRequest.onsuccess = (e: any) => {
          resolve(e.target.result);
        };

        getRequest.onerror = (e: any) => {
          reject(e.target.error);
        };
      };

      request.onerror = (event: any) => {
        reject(event.target.error);
      };
    });
  }
}
