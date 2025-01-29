// utils/firebaseErrorMessages.js

export const getCustomErrorMessage = (errorCode) => {
  const errorMessages = {
    'auth/invalid-email':
      'The email address is not valid. Please enter a valid email.',
    'auth/user-disabled':
      'This account has been disabled. Please contact support for assistance.',
    'auth/invalid-credential':
      'Unable to log in. Please double-check your credentials.',
    'auth/wrong-password':
      'The password you entered is incorrect. Please try again.',
    'auth/email-already-in-use':
      'This email is already registered. Please log in or use a different email.',
    'auth/weak-password':
      'The password is too weak. Please use at least 6 characters.',
    'auth/operation-not-allowed':
      'Email/password sign-in is currently disabled. Please contact support.',
    'auth/requires-recent-login': 'Please log in again to perform this action.',
    'auth/too-many-requests':
      'Too many attempts. Please wait a while before trying again.',
    'auth/network-request-failed':
      'Network error. Please check your connection and try again.',
    // Add more Firebase error codes as needed
    default: 'An unexpected error occurred. Please try again.',
  };

  return errorMessages[errorCode] || errorMessages.default;
};
