export function validatePassowordPolicy(passoword : string) {
  
  const containsUppercase = /[A-Z]/.test(passoword);
  const containsLowercase = /[a-z]/.test(passoword);
  const containsSpecialCharacter = /[^A-Za-z0-9]/.test(passoword);

  const isValidPassoword = containsUppercase && containsLowercase && containsSpecialCharacter

  return isValidPassoword
}