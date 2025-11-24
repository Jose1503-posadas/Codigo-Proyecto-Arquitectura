export default class ResetCode {
  email: string;
  code: string;
  expiresAt: Date;

  constructor(email: string, code: string) {
    this.email = email;
    this.code = code;
    this.expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min
  }
}
