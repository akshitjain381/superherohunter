export const PUBLIC_KEY = 'f50e0c715d86f941a5f1019ee691c90b';
export const PRIVATE_KEY = 'a978d09c69a1fed73e67bdb6a57fdb9536b503a7';
export const BASE_URL = 'https://gateway.marvel.com:443/v1/public/characters';

export function getHash(ts) {
    const hash = CryptoJS.MD5(ts + PRIVATE_KEY + PUBLIC_KEY).toString();
    return hash;
}