InstaService - Service Booking App
InstaService is a service booking application that allows users to browse available services, add them to a shopping cart, and proceed to checkout. The application uses React, Zustand for state management, and Vite as the build tool. This README will guide you through setting up and running the project locally.

Features
Service Listing: Users can browse a list of services, view their details (price, description, duration), and add them to their cart.
Shopping Cart: Users can view their cart, update item quantities, and remove items.
Checkout: Users can fill out customer details and complete their order.
Receipt: After successful checkout, users can see their receipt with an order summary.


Tech Stack
React: Frontend library for building user interfaces.
Zustand: Lightweight state management for managing the cart and services.
Lucide-React: Icon library for displaying icons like the shopping cart, trash, and plus/minus buttons.
Tailwind CSS: Utility-first CSS framework for rapid UI development.
Vite: Next-generation build tool that provides fast development and production builds.
Prerequisites
Before you can run the project locally, make sure you have the following installed on your machine:

Node.js (version 14 or higher)
npm (comes with Node.js)
Setup and Installation
Clone the repository:

Open your terminal and run the following command to clone the repository:

bash
Copy
git clone https://github.com/yourusername/instaservice.git
Navigate into the project directory:

bash
Copy
cd instaservice
Install dependencies:

Install the required dependencies using npm (or yarn, if preferred):

bash
Copy
npm install
This will install all the necessary packages listed in package.json.

Start the development server:

To start the development server and open the app in your browser, run:

bash
Copy
npm run dev
By default, the app will be available at http://localhost:5173.

You should see the InstaService application running with all the features, such as browsing services, adding to the cart, and completing the checkout.