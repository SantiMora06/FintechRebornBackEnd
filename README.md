# Reborn

Reborn is a e-comerce for second hand and refurbished technological products, so far, aiming to reduce the CO2 print by providing used technology at competitive prices! Customers will post it's products in place, edit them and adding the basic features to be sold. This SAP has a private route to guarantee the safe access to fully interact with the page.

## API routes

- /auth/signup - POST An user/admin signup
- /auth/login - POST An user/admin login
- /auth/verify - Will verify the user/admin
- /api/producst/createdBy/:userId - GET products created by an user
- /api/products - GET or POST all the products
- /api/products/:productsId - GET, PUT or DELETE a product
- /api/orders - GET or POST an order
- /api/orders/:ordersId - GET an order
- /api/orders/currentuser/:userId - GET the others of an user
- /api/users - Get an user
- /api/users/:userId - GET or PUT an user

### Implementation features

- For the server-side (Backend )we used Node.js, Express.js and MongoDB for the database
- We set up the server on Express with routes for authentication, users, products and orders.
- For the models and its relationships we used Mongoose for MongoDB.
- We made a double implementation middleware for JTW authentication to protect the routes and we created a middleware which will controll if the user is a customer or an admin.
- We use React.js for the Frontend.
- We set up React with routing and state management (Context API).
- We create signup and signin forms for register and login, another for product creation and components for the Cart, Products...
- We implemented routes with private and role routes to allow either customers or admins to make orders/edit them.

## Models and relationships

We created three complete models:

- Users
    - username
    - password
    - email
    - address
    - phone
    - role

- Products
    - name
    - category
    - description
    - price
    - discount
    - stock
    - images
    - createdBy

- Orders
    - userId
    - firstName
    - lastName
    - streetHouseNumber
    - city
    - zipCode
    - orderItems [productId, quantity]
    - status

    The relationships are the following: 

    - User is related with the products. He/She can be the owner (Posting several products), the product of the owner (Getting an order) and the order will be directly linked to the user id. A user can have multiple products, and multiple orders.
    - Product is related with the User and the Order. The product will be created by an user, edit it by it or delete it by the user created by it, also the product will be the reference for the order. A product belongs to one user, could belong to multiple orders.
    - Order is related with Product and User. The order will have information regarding the buyer of the product (User) and which products are going to be buy. An order belongs to one user, an order can have multiple products.

### Features

- Authentication of the user
- Registration and Login of the user, so when you'll add products to the cart or updating your profile, your user info will be included.
- We secure the authentication using bcrypt for password hashing, JWT (to protect the API routes), the handling of relationships and ensuring the products are deleted from the page and the database.
- Given the Private Routes, the Frontend would be just accesible to users.
- Listing products.
- Listing users (Admin only).
- Listing orders (Admin only).
- Filter by name of the product.

### Backlogs

- Stripe integration
- Free chatbot
- Add chaptcha
- Discount popup
- add skeleton for loading time
- Further refactoring
- Third-Party Sign-in using Google, Github...
- Drag & Drop feature for product images
- Email confirmation for user account

### To start collaborating 😺

> Fork the repo on GitHub
> clone the original - git clone ><
> And start working! Remeber to check if the changes work and then add, commit and push the changes.
> After a couple of hours or days you'll see if the changes were implemented and we will contact you.
