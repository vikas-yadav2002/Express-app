# User Payment Dashboard

A Node.js/Express application with React frontend that demonstrates MongoDB aggregation for joining user and payment collections.

## Features

- Express backend with MongoDB integration via Mongoose
- MongoDB collections for users and their payment records
- Aggregation pipeline to join related data
- React frontend with dark UI and simple animations
- Data sorting and filtering capabilities
- Responsive design for all devices

## Tech Stack

- **Backend**: Node.js, Express, Mongoose
- **Frontend**: React, TypeScript, Tailwind CSS
- **Database**: MongoDB
- **Other Tools**: Vite, Axios

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/user-payment-dashboard.git
cd user-payment-dashboard
```

2. Install dependencies:
```
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-payment-db
VITE_API_URL=http://localhost:5000
```

### Running the Application

1. Seed the database with sample data:
```
npm run seed
```

2. Start the development server (both frontend and backend):
```
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start both frontend and backend servers
- `npm run dev:frontend` - Start only the frontend server
- `npm run dev:backend` - Start only the backend server
- `npm run build` - Build the frontend for production
- `npm run seed` - Seed the database with sample data

## Database Schema

### User Collection (tbl_user)

```
{
  _id: ObjectId,
  name: String,
  email: String
}
```

### Payment Collection (tbl_user_payment)

```
{
  _id: ObjectId,
  userId: ObjectId (reference to tbl_user._id),
  amount: Number,
  date: Date
}
```

## API Endpoints

- `GET /api/users-with-payments` - Get all users with their payments
- `GET /api/users/:id` - Get a single user with payments
- `POST /api/users` - Create a new user
- `POST /api/payments` - Create a new payment
- `GET /api/payments` - Get all payments
