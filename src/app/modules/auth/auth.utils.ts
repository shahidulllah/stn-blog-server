import jwt from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';

const jwt_secret = config.jwt_access_secret;

if (!jwt_secret) {
  throw new Error('JWT secret is not defined in the configuration.');
}

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, jwt_secret, { expiresIn: '1d' });
};
