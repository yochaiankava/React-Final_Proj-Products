# document -step by step for react products:
https://docs.google.com/document/d/1mS0ynPsG6_gY5DIxsdiSDG0ViBAwhKK3Vdm_rhuQE48/edit?usp=sharing


E-commerce React App README
Welcome to the README file for our E-commerce React App! This document provides an overview of the app's functionality, setup instructions, and some user guidelines.

Overview
Our E-commerce React App provides a basic view of an e-commerce website, allowing users to browse products, add items to their cart, and manage their shopping experience.

Features:
User Authentication: Users can log in, register, and if they don't have a pending cart, a new one will be created for them.
Product Browsing: Users can view products and filter them by category or by product name.
Cart Management: Users can add products to their cart, view cart details, modify product quantities, and delete products from their cart.
Order History: Users can view details of their past carts.
Checkout Process: On checkout, the database's product quantities are updated, the user's cart status changes to "closed," and the user is logged out.
Admin Privileges: Only the admin user (username: yochai, password: Ya141179) can add products to the database.
Installation & Setup
Clone the Repository:

git clone https://github.com/yochaiankava/React-Final_Proj-Products.git
cd [repository_name]

Install Dependencies:
npm install
Environment Setup:

Ensure you have Node.js and npm installed.
Set up your environment variables (e.g., database connection strings, API keys) as required.
Run the App:

npm start
The app should now be running locally on http://localhost:3000/.

User Guide
Logging In & Registration:
New users can register using the registration form.
To log in as a regular user, use any existing username with the password Ya141179.

Admin Access:
For admin privileges (e.g., adding products), use:
Username: yochai
Password: Ya141179

Shopping Experience:
Browse products by navigating to the relevant sections.
Use filters to narrow down your product search.
Click on "Add to Cart" to add products to your shopping cart.
Navigate to the cart page to view, modify, or delete items in your cart.
Click on "Checkout" when ready to complete your purchase.

Deployment & Source Code:
React Front-end App:
Render: https://react-final-proj-products-web.onrender.com
GitHub Repository: https://github.com/yochaiankava/Django-Final_Proj-Products.git

Django Server:
Render: https://django-final-proj-products.onrender.com
GitHub Repository: https://github.com/yochaiankava/React-Final_Proj-Products.git




