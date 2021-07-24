import { Hasher, Decrypter, Encrypter, HashComparer } from '@/data/protocols'

import faker from 'faker'

export class HasherSpy implements Hasher {
  digest = faker.datatype.uuid()
  plaintext: string

  async hash (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.digest
  }
}
export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password()
  ciphertext: string

  async decrypt (ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext
    return this.plaintext
  }
}

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.datatype.uuid()
  plaintext: string

  async encrypt (plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}

export class HashComparerSpy implements HashComparer {
  isEqual = true
  plaintext: string
  ciphertext: string

  async compare (plaintext: string, ciphertext: string): Promise<boolean> {
    this.plaintext = plaintext
    this.ciphertext = ciphertext
    return this.isEqual
  }
}
