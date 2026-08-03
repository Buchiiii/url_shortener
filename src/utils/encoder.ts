const ALPHABET =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function encodeBase62(num: number): string {
    if (num === 0) return '0';

    let result = '';

    while (num > 0) {
        result = ALPHABET[num % 62] + result;
        num = Math.floor(num / 62);
    }

    return result;
}