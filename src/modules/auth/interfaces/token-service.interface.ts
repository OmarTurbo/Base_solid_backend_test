export interface ITokenService {
  sign(payload: object): string;
  verify(token: string): object;
}