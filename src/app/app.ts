import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Product } from './api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private apiService = inject(ApiService);

  products = signal<Product[]>([]);
  categories = signal<string[]>([]);
  selectedCategory = signal<string>('all');

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isSidebarOpen = signal(false);
  cartCount = signal(0);

  // For Quick View / Sticky Add to Cart demo
  selectedProduct = signal<Product | null>(null);

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  loadProducts() {
    this.apiService.getProducts().subscribe(res => {
      this.products.set(res.products);
    });
  }

  loadCategories() {
    this.apiService.getCategories().subscribe(res => {
      this.categories.set(res);
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
    if (category === 'all') {
      this.loadProducts();
    } else {
      this.apiService.getProductsByCategory(category).subscribe(res => {
        this.products.set(res.products);
      });
    }
    this.isSidebarOpen.set(false);
  }

  addToCart(product: Product, event: Event) {
    event.stopPropagation();
    this.cartCount.update(c => c + 1);
    // Visual feedback for sticky add to cart
    this.selectedProduct.set(product);
    setTimeout(() => this.selectedProduct.set(null), 3000);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }

  openQuickView(product: Product) {
    this.selectedProduct.set(product);
  }

  closeQuickView() {
    this.selectedProduct.set(null);
  }
}
