export interface User {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  admin?: boolean;
  password?: string;
}

export interface Room {
  id?: number;
  name?: string;
  slug?: string;
  description?: string;
}
