/**
 * Validates if an email address is properly formatted
 * @param {string} email - the email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */

export const validateEmail = (email) => {
    //Basic regex pattern for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //Check if email is not empty and matches the pattern
    if(!email || typeof email !== 'string'){
        return false;
    }

    return emailRegex.test(email.trim());
};