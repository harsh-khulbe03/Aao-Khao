# Aaokhao - Food Ordering Application

Aaokhao is a modern food ordering web application where users can browse restaurants, view menus, and place orders online. This project mimics popular food delivery platforms like Swiggy, featuring restaurant details, cuisine information, and cloud-based image hosting using the Swiggy API.

## Table of Contents

- [Features](#features)
- [How to Use](#how-to-use)
- [Technologies](#technologies)
- [Installation and Setup](#installation-and-setup)
- [Acknowledgments](#acknowledgments)

## Features

- **Dynamic Data Fetching**: The application fetches restaurant data from the Swiggy API based on the user's location.
- **Restaurant Browsing**: Users can browse a variety of restaurants and their menus.
- **Real-time Data**: Integrated with the Swiggy API for fetching real-time restaurant data and images.
- **Responsive UI**: Built with Tailwind CSS for a user-friendly experience.
- **Detailed Information**: Users can view restaurant names, cuisines, ratings, and cost for two.

## How to Use

1. **Start the Application**: Follow the installation steps below to run the application locally.
2. **Browse Restaurants**: Users can view a list of restaurants based on the default location set in the app.
3. **View Restaurant Details**: Click on any restaurant card to view the menu, including details like cuisine, rating, and cost for two.

## Technologies

- **Frontend**: React.js, Tailwind CSS, Parcel for bundling
- **Backend**: Express.js (for proxying Swiggy API)
- **API**: Swiggy API for fetching restaurant data and images
- **Deployment**: Local development server with a proxy server for CORS handling

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- Git (optional for cloning)

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

3. **Run Frontend**:

    ```bash
    cd frontend
    npm run dev
    ```

4. **Run Backend (Proxy Server)**:

    ```bash
    cd backend
    npm run dev
    ```

## Acknowledgments

- **Swiggy API**: For providing the restaurant data that powers the application.
- **Tailwind CSS**: For the styling framework that enhances the UI design.
- **React Community**: For the ongoing support and resources that help make building applications easier.
