export class InvalidCredentialsError extends Error {
  constructor() {
    super('Password is invalid')
  }
}
