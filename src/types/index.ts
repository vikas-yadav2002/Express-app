export interface User {
  _id: string;
  name: string;
  email: string;
  payments?: Payment[];
}

export interface Payment {
  _id: string;
  userId: string;
  amount: number;
  date: string;
}

export interface UserWithPayments extends User {
  payments: Payment[];
}