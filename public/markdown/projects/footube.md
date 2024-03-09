# About the Project

FooTube is a personal project designed as a YouTube clone to enhance my skills with specific technologies and understand key web development concepts, particularly focusing on security with authorization and encryption.

It was essential to secure the API endpoints effectively and ensure a seamless sync between user authentication/authorization on both the client and server sides. The choice of MongoDB was driven by the app's straightforward relational structure, where the main functionality revolves around server authentication.

This project structure allowed me to concentrate on the logic of the API by simplifying the data management aspect.

# Project Execution

The FooTube app is constructed using the MERN stack. Security is the major focus, with Express custom middleware verifying cookies and JWTs against hashed credentials stored in MongoDB, ensuring that only authorized requests proceed.

The whole user experience revolves around the authenticated user's profile, so the frontend leverages Redux for global state management, allowing for consistent data across the app. Firebase is utilized for media storage, simplifying backend work by storing key strings in the database for media retrieval.

Deployment was approached as a monorepo, with a proxy address serving both client and server from the same URL, streamlining the deployment process.

# Project Results

This project emphasized securing API endpoints, simplifying data structure with MongoDB, and enhancing user experience with Redux for state management.

This project served as a practical application of integrating various technologies to build a secure and functional web application, reflecting a hands-on learning experience in web development security practices.