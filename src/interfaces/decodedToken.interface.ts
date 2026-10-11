export interface DecodedToken {
  id: string;
  email: string;
  role: string;
  tokenVersion: number;
  iat: number;
  exp: number;
}
