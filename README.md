This Employee Management System (EMS) is a full-stack MERN application designed to manage employees, departments, leaves, and salary operations with secure role-based access. 
The system supports Admin and Employee roles, where admins can manage employees, departments, approve or reject leave requests, 
add and update salary details, and view dashboard statistics, while employees can view their profiles, apply for leave, track leave status, and view their salary history. 
The application uses React with Tailwind CSS for a responsive UI, Node.js and Express for RESTful APIs, MongoDB for data persistence, and JWT for authentication and authorization. 
It includes server-side pagination, search functionality, protected routes, and scalable architecture suitable for real-world HR and payroll management use cases.

Frontend : React &  tailwind CSS for styling
backend : express, node.js, restful API for handling requests and responses.
database : mongodb

Installation & Setup : Clone the repo from git hub 
1. Start MongoDB locally or use Atlas.
2. Backend:
   - cd backend
   - npm install
   - set .env values
   - npm start
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev
