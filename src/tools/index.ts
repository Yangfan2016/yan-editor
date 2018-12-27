export function encode2Base64(str: string): string {
    return btoa(encodeURIComponent(str));
}
export function decode2Base64(str: string): string {
    return encodeURIComponent(atob(str));
}