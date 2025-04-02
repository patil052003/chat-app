import jwt from 'jsonwebtoken';

const createTokenAndSaveCookie = (userId, res) => {
  try {
    // Create JWT
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '10d', 
    });

    
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Only secure in production
      sameSite: 'strict', // Protect against CSRF
      path: '/', // Cookie available site-wide
      domain: process.env.COOKIE_DOMAIN || 'localhost', // Dynamically set domain
    });

    console.log('Token set in cookie:', token );
  } catch (error) {
    console.error('Error creating token and setting cookie:', error);
    throw new Error('Failed to create token');
  }
};

export default createTokenAndSaveCookie;
