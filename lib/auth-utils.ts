import bcryptjs from 'bcryptjs';

/**
 * Generate a unique username with the format: Adjective + Animal + #XXXX
 * Examples: FitWolf#4821, SwiftLion#1234, etc.
 */
export function generateUsername(): string {
  const adjectives = [
    'Swift', 'Strong', 'Fit', 'Bold', 'Quick', 'Dynamic', 'Keen', 'Smart',
    'Agile', 'Bright', 'Brave', 'Clever', 'Energetic', 'Fierce', 'Focused',
    'Powerful', 'Rapid', 'Solid', 'Steady', 'Vital', 'Vibrant', 'Wise',
  ];

  const animals = [
    'Wolf', 'Lion', 'Eagle', 'Tiger', 'Bear', 'Hawk', 'Puma', 'Lynx',
    'Raven', 'Shark', 'Orca', 'Panther', 'Falcon', 'Phoenix', 'Cobra',
    'Dragon', 'Stallion', 'Cheetah', 'Jackal', 'Mongoose', 'Viper', 'Grizzly',
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  return `${adjective}${animal}#${number}`;
}

/**
 * Generate a random 8-character password
 */
export function generateRandomPassword(): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}
