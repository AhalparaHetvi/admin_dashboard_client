// import * as CryptoJS from 'crypto-js';

// const SECRET_KEY = 'lernenhub-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2vbm'; // Replace with a strong secret key

// // Set data with encryption and expiration
// function setEncryptedData(key, value, expirationInMinutes) {
//     const expirationTimestamp = new Date().getTime() + (expirationInMinutes * 8) * 60 * 1000;

//     const data = {
//         value: CryptoJS.AES.encrypt(JSON.stringify(value), SECRET_KEY).toString(),
//         expiration: expirationTimestamp
//     };
//     localStorage.setItem(key, JSON.stringify(data));
// }

// // Get decrypted data
// function getDecryptedData(key) {
//     const storedData = localStorage.getItem(key);
//     if (!storedData) return null;

//     try {
//         const parsedData = JSON.parse(storedData);
//         const { value, expiration } = parsedData;

//         // Check if expired
//         if (new Date().getTime() > expiration) {
//             localStorage.removeItem(key); // Remove expired data
//             return null;
//         }

//         // Decrypt the data
//         const decryptedBytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
//         const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
//         return JSON.parse(decryptedData);
//     } catch (error) {
//         console.error('Error decrypting data:', error);
//         return null;
//     }
// }

// // Remove data
// function removeData(key) {
//     localStorage.removeItem(key);
// }

const getTwoInitials = (name) => {

    if (!name) return '';

    const words = name
        .split(' ')                          // Split the name by spaces
        .filter(word => word.trim());        // Remove empty strings caused by extra spaces

    if (words.length === 1) {
        return words[0][0].toUpperCase();    // Return the first letter if there's only one word
    }

    return words
        .slice(0, 2)                         // Take the first two words
        .map(word => word[0].toUpperCase())  // Get the first letter of each word in uppercase
        .join('');                           // Join them together
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// const phonePattern = /^[6-9]\d{9}$/;
export { getTwoInitials, emailPattern };
