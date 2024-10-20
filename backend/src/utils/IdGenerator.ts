export function gerarId(): string {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    return `IC${randomDigits}OM`;
}
