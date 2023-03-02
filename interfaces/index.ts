export type Category = {
  id: number;
  firstname: string;
  lastname: string;
  role: string;
  telephone: string;
  email: string;
  email_verified: string;
  [key: string]: unknown | object;
};
