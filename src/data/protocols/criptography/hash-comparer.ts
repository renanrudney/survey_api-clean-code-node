export interface HashComparer {
  compare: (plaintext: string, ciphertext: string) => Promise<boolean>
}
