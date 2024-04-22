export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  PrimeiroNome?: string;
  UltimoNome?: string;
  gender?: string;
  image?: string;
  token?: string;
}
