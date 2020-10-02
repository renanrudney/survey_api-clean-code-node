export interface UpdateAccessTokenRepository {
  update: (id: string, _token: string) => Promise<void>
}
