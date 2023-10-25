import Cryptr from "cryptr";

export function encrypt(text) {
    try {
        const secretKey = process.env.NEXTAUTH_SECRET;
        const cryptr = new Cryptr(secretKey);
        const encryptedString = cryptr.encrypt(text);
        return encryptedString;
    } catch (error) {
        console.error("Encryption error:", error);
        return null; // Handle the error as needed
    }
}

export function decrypt(encryptedString) {
    try {
        const secretKey = process.env.NEXTAUTH_SECRET;
        const cryptr = new Cryptr(secretKey);
        const text = cryptr.decrypt(encryptedString);
        return text;
    } catch (error) {
        console.error("Decryption error:", error);
        return null; // Handle the error as needed
    }
}
