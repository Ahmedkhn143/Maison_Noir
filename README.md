# MAISON NOIR — Contemporary Clothing Storefront

MAISON NOIR is a premium, high-end minimalist e-commerce storefront designed for a contemporary fashion brand. It blends aesthetic simplicity with modern user interactions, smooth animations, and robust utility systems.

---

## 🖤 Live Demonstration & Design Philosophy

The layout is built around the concept of **"Less, but better"**—focusing on structured elegance, high-contrast typography, and fluid micro-interactions that elevate the digital brand experience.

### ✨ Key Features
- **Modern E-Commerce Features**:
  - **Dynamic Cart Drawer**: Sidebar panel tracking selected items, prices, and quantities with real-time updates.
  - **Toast Notification System**: Elegant alert popups confirming item additions/removals.
  - **Interactive Catalog Filtering**: Fast sorting of collections across different categories (Tops, Bottoms, Layers).
  - **Interactive Wishlist**: Easy addition and removal of items from users' personal list.
- **Engaging Visual Interactions**:
  - **Micro-Animations**: Shimmer effects, dynamic hover transitions, card scalings, and page load fade-ins.
  - **Scroll Parallax & Effects**: Subtle background parallax transitions matching standard premium fashion websites.
  - **Dynamic Statistics Counter**: Animated milestones when scrolling into the brand philosophy section.
  - **Newsletter Signup**: Seamlessly validated footer newsletter form.
- **Fully Responsive & Accessible Layout**: Beautiful scaling from mobile devices to ultra-wide desktop views.

---

## 🛠️ Project Structure

The project has been organized with clean separation of concerns:

```bash
Cloth/
├── main.html       # Clean structure and layout semantic HTML5 markup
├── style.css       # Core stylesheets containing custom keyframes, scrollbar styles, and layouts
├── script.js       # Client-side JavaScript containing cart states, listeners, and UI controller logic
└── README.md       # Project details, layout description, and startup guide
```

---

## ⚡ Tech Stack

- **HTML5**: Semantic markup for accessibility and search-engine structure.
- **Tailwind CSS**: Modern utility classes for rapid layout prototyping.
- **Vanilla CSS**: Custom animations, smooth scrolls, custom scrollbars, and aesthetic tweaks.
- **Vanilla JavaScript**: State handling, viewport observation, element filters, and layout interactions.
- **Iconify Web Components**: Lightweight utility icons.

---

## 🚀 How to Run Locally

Since this storefront is constructed entirely with pure client-side technologies, you can open and run it instantly.

1. **Option A: Direct Execution**
   - Simply double-click `main.html` to open it in your browser.

2. **Option B: Live Server (Recommended)**
   - Open the directory in your IDE of choice.
   - Run a basic static file server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Or using Node.js
     npx serve .
     ```
   - Open your browser to `http://localhost:8000` or `http://localhost:3000` to preview it with active hot-reloads.
