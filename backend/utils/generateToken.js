// ============================================
// JWT TOKEN GENERATION UTILITY
// ============================================

import jwt from 'jsonwebtoken';

// ============================================
// GENERATE TOKEN FUNCTION
// ============================================

/**
 * Generates a JWT (JSON Web Token) for a user
 * The token contains the user's ID and expires after a set time
 * 
 * Usage:
 *   const token = generateToken(userId);
 *   res.json({ token });
 * 
 * @param {String} userId - The MongoDB user ID to encode in the token
 * @returns {String} - The generated JWT token
 * @throws {Error} - If JWT_SECRET is not defined or token generation fails
 */
const generateToken = (userId) => {
  // Validate that JWT_SECRET exists in environment variables
  if (!process.env.JWT_SECRET) {
    throw new Error(
      'JWT_SECRET is not defined. Please set it in your .env file.'
    );
  }

  try {
    // Create and sign the JWT token
    // jwt.sign(payload, secret, options)
    const token = jwt.sign(
      { id: userId }, // Payload - data to encode in the token
      process.env.JWT_SECRET, // Secret key - used to sign the token
      {
        expiresIn: process.env.JWT_EXPIRE || '30d', // Token expiration time
        // expiresIn options:
        // '24h' - 24 hours
        // '7d' - 7 days
        // '30d' - 30 days
      }
    );

    return token;
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

export default generateToken;