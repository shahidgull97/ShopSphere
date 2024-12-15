# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# ShopSphere an E-Com app

## Overview

This is a simple E-Commerce Application that allows users to browse products, add them to the cart, update cart item quantities, and make purchases. After purchase, an orders list is generated where users can view their past transactions.

## Features

=>Product Management: View a list of available products with details like price and description.
=>Cart Functionality:

1. Add products to the cart.
2. Update item quantities in the cart.
3. Remove items from the cart.

=>Purchases:

1. Complete a purchase with all items in the cart.
2. Clear the cart after successful checkout.

=>Orders List: View a history of past purchases.
=>Responsive UI: Works seamlessly across different devices.

## Installation

This app is build in React with vite and Tailwind Css. You can clone the repository from the above link in the project.
Navigate to the project directory
Example:cd e-commerce-app

Install dependencies:-npm install

And Start the development server:- npm run dev

## Usage

### Adding Products to the Cart

### Homepage

![Homepage Screenshot](./public/images/HomePage.png)
Browse the product list on the homepage.
Click the "Add to Cart" button for the desired product.

### Updating Cart Items

### Cart Page

![Cart Page Screenshot](./public/images/CartItems.png)
Navigate to the Cart page.
Use the "+" and "-" buttons to adjust item quantities.
Click Remove to delete an item from the cart.

### Purchasing Items

Click the Purchase Now button on the cart page to complete a purchase.
After successful checkout, your cart will be cleared, and the order will be added to the orders list.

### Viewing Orders

### Cart Page

![Orders Page Screenshot](./public/images/Orders.png)
Navigate to the Orders page to see a list of completed transactions.

## Technologies Used

React, Redux toolKit, Tailwind CSS, Vite, FireStore Database

### Happy Coding! 🚀
