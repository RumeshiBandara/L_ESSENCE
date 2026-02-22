import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'https://dummyjson.com/products';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(this.apiUrl);
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/category-list`);
    }

    getProductsByCategory(category: string): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(`${this.apiUrl}/category/${category}`);
    }

    getProductsByBrand(brand: string): Observable<ProductResponse> {
        return this.http.get<ProductResponse>(`${this.apiUrl}/search?q=${brand}`);
    }
}
