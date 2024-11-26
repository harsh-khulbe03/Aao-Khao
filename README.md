# Aaokhao - Food Ordering Application

Aaokhao is a modern food ordering web application where users can browse restaurants, view menus, add items to their cart, and place orders online. This project mimics popular food delivery platforms like Swiggy, featuring restaurant details, cuisine information, cloud-based image hosting, and a functional cart system integrated with the Swiggy API.

## Table of Contents

- [Features](#features)
- [How to Use](#how-to-use)
- [Cart Functionality](#cart-functionality)
- [Payment Functionality](#payment-functionality)
- [Technologies](#technologies)
- [Installation and Setup](#installation-and-setup)
- [Acknowledgments](#acknowledgments)

---

## Features

- **Dynamic Data Fetching**: The application fetches restaurant data from the Swiggy API based on the user's location.
- **Restaurant Browsing**: Users can browse a variety of restaurants and their menus.
- **Real-time Data**: Integrated with the Swiggy API for fetching real-time restaurant data and images.
- **UI Library**: Built with Tailwind CSS for a user-friendly experience.
- **Detailed Information**: Users can view restaurant names, cuisines, ratings, and cost for two.
- **Cart Functionality**: Users can add, remove, and modify items in their cart before proceeding to checkout.
- **Payment Functionality**: Users can securely make payments for their orders using Razorpay.

---

## How to Use

1. **Start the Application**: Follow the installation steps below to run the application locally.
2. **Browse Restaurants**: Users can view a list of restaurants based on the default location set in the app.
3. **View Restaurant Details**: Click on any restaurant card to view the menu, including details like cuisine, rating, and cost for two.
4. **Use the Cart**: Add items to your cart, adjust quantities, or remove them. The cart dynamically updates as you make changes.
5. **Proceed to Checkout**: Once you've added items to your cart, click on "Checkout" to review your order.
6. **Make Payment**: After reviewing your order, you'll be directed to a payment gateway powered by **Razorpay** to securely complete the transaction.

---

## Technologies

- **Frontend**: React.js, Tailwind CSS, Vite for bundling
- **Backend**: Express.js (for proxying Swiggy API and handling cart operations, including payment)
- **API**: Swiggy API for fetching restaurant data and images
- **Payment Gateway**: Razorpay API for payment processing
- **Deployment**: Vercel(https://aaokhao-frontend.vercel.app/)

---

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- Git (optional for cloning)
- Razorpay Test API keys (for payment integration in Test Mode)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/harsh-khulbe03/aaokhao.git
    cd aaokhao
    ```

2. **Install dependencies**:
    ```bash
    cd backend
    npm install

    cd frontend
    npm install
    ```

3. **Configure Razorpay**:
    - Sign up on [Razorpay](https://razorpay.com/) and generate your Test API keys.
    - Add your Razorpay Test API keys to the `.env` file in the `backend` directory:
      ```bash
      RAZORPAY_KEY_ID=<your_key_id>
      RAZORPAY_KEY_SECRET=<your_key_secret>
      ```

4. **Run Frontend**:

    ```bash
    cd frontend
    npm run dev
    ```

5. **Run Backend (Proxy Server)**:

    ```bash
    cd backend
    npm run dev
    ```

6. **Test Payment Flow**: After placing an order and proceeding to checkout, users should be able to test the Razorpay payment flow with a demo/test mode provided by Razorpay.

---

## Acknowledgments

- **Swiggy API**: For providing the restaurant data that powers the application.
- **Tailwind CSS**: For the styling framework that enhances the UI design.
- **Razorpay**: For providing a secure payment gateway for processing transactions.
- **React Community**: For the ongoing support and resources that help make building applications easier.

---
