# Ali & Nas Blog App 

This is a simple blog application built using Node.js and Express. It allows users to sign up, sign in, and view blog posts. Additionally, it features a dashboard for admins to manage posts including adding, deleting, and updating them. Whenever a new post is added by the admin, an email notification is sent to all subscribers.

## Features

- User authentication: Users can sign up and sign in to the application.
- Admin dashboard: Admins have access to a dashboard where they can manage blog posts.
- CRUD operations: Admins can perform CRUD (Create, Read, Update, Delete) operations on blog posts.
- Email notifications: Subscribers receive email notifications whenever a new post is added.

## Technologies Used

- Node.js: A JavaScript runtime environment used for server-side development.
- Express: A web application framework for Node.js used for building APIs and web applications.
- Bootstrap: A front-end framework for developing responsive and mobile-first websites.
- Other libraries and packages for various functionalities.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AliQassab/express.js-blog.git
    ```

2. Navigate to the project directory:

    ```bash
    cd blog-app
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    EMAIL_USERNAME=your_email_username
    EMAIL_PASSWORD=your_email_password
    ```

    Replace `your_mongodb_connection_string` with your MongoDB connection string, `your_email_username` with your email username for sending notifications, and `your_email_password` with your email password.

5. Start the server:

    ```bash
    npm start
    ```

6. Access the application in your web browser at `http://localhost:3000`.

## Usage

- Visit the homepage to view the latest blog posts.
- Sign up or sign in to access additional features.
- Admins can navigate to the dashboard to manage posts.
- Users can subscribe to receive email notifications for new posts.

## Contributors

- Add your name here if you contributed to the project.



## Acknowledgments

- Any acknowledgments or credits you want to include can go here.
