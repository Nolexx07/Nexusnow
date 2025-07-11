# Nexusnow

A multi-service web application combining Grocery (BigBasket), Shopping (Flipkart/Amazon), and Transport Booking (MakeMyTrip) — all in one place.

## Features
- Grocery: Category sliders, product grid, sticky cart, promo banners
- Shopping: Segments (Child, Boy, Men, Women), filters, product cards, cart
- Transport: Book Bus, Train, Flights, filter by date/mode, export to CSV
- Checkout, Orders, Summary: Functional UIs, localStorage tracking
- Modern, minimal UI with light/dark mode
- Mobile-first, accessible, fast

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Run the backend (serves frontend too)
```
npm start
```

- Visit [http://localhost:3000](http://localhost:3000)

## Project Structure
- `backend/` — Express server, API routes, sample data
- `frontend/` — HTML, CSS, JS modules, assets

## Authentication Setup

1. Install dependencies:
   ```
   npm install bcrypt jsonwebtoken
   ```
2. (Optional) Set a JWT secret in your environment:
   ```
   export JWT_SECRET=your_secret_key
   ```
3. The backend now supports:
   - Email + password registration and login at `/api/auth/register` and `/api/auth/login`
   - (Planned) Google social login at `/api/auth/google`

---

**Customize and expand each module as needed!** 