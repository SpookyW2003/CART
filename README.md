# 📦 Static Bundle Builder UI

A **Shopify-style custom bundle section** built with **HTML, CSS, and JavaScript**.  
The UI allows users to select products, track bundle progress, view discounts, and simulate adding the bundle to the cart — all without any backend.

---

## 🎯 Objective
Recreate the **Bundle Builder Section** as shown in the provided Figma design.  
The goal is to mimic the behavior and layout of a Shopify bundle builder:

- **Select products** into a bundle
- **Track progress** with a progress bar
- **Show discount** when eligible
- **Display subtotal** dynamically
- **Enable CTA** when requirements are met

---

## ✨ Key Features

### 🛍 Responsive Grid of Products
- 6 product cards with:
  - Product image
  - Title
  - Price
  - Toggle-style **"Add to Bundle"** button

### 📊 Bundle Sidebar (Right side on desktop)
- **Progress Bar** → shows selected item count (e.g., `2/3 added`)
- **Selected Products List** → thumbnail, name, price
- **Discount Logic** → 30% off when 3+ products are added
- **Subtotal** → updates dynamically
- **CTA Button** → `"Add Bundle to Cart"` enabled only when 3+ products are selected

### 📱 Mobile-Friendly Layout
- Product grid stacks vertically
- Sidebar moves below product grid or becomes sticky

---

## 🎨 Design Reference
- **Figma File** → *(Insert your Figma link here)*

---

## 📂 Folder Structure
```plaintext
/bundle-builder/
  ├── index.html
  ├── style.css
  ├── script.js
  └── /assets/
        ├── product-1.jpg
        ├── product-2.jpg
        └── icons/
