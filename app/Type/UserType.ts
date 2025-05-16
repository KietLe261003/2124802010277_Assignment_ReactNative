export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  fullName: string;
  phoneNumber: string;
  address: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  code: number;
  message: string;
  data: any;
}

export interface UserInfoResponse {
  code: number;
  message: string;
  data: User;
}