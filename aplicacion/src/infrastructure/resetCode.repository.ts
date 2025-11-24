import { db } from './db';

const resetCodeRepository = {
  async save(email: string, code: string, expiresAt: Date) {
    await db.query(
      `
        INSERT INTO reset_codes (email, code, expires_at)
        VALUES ($1, $2, $3)
      `,
      [email, code, expiresAt]
    );
  },

  async find(code: string) {
    const result = await db.query(
      `SELECT * FROM reset_codes WHERE code = $1`,
      [code]
    );
    return result.rows[0] || null;
  },

  async delete(code: string) {
    await db.query(`DELETE FROM reset_codes WHERE code=$1`, [code]);
  }
};

export default resetCodeRepository;
