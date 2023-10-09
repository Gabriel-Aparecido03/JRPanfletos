export function isValidCnpjNumber(cnpj:string) {
  cnpj = cnpj.replace(/[^\d]/g, '');

  if (cnpj.length !== 14) {
    return false;
  }

  let sum = 0;
  let pos = 5;
  for (let i = 0; i < 4; i++) {
    sum += parseInt(cnpj.charAt(i)) * pos;
    pos--;
  }
  pos = 9;
  for (let i = 4; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * pos;
    pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  const firstDigit = (sum % 11) < 2 ? 0 : 11 - (sum % 11);

  sum = 0;
  pos = 6;
  for (let i = 0; i < 5; i++) {
    sum += parseInt(cnpj.charAt(i)) * pos;
    pos--;
  }
  pos = 9;
  for (let i = 5; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * pos;
    pos--;
    if (pos < 2) {
      pos = 9;
    }
  }
  const secondDigit = (sum % 11) < 2 ? 0 : 11 - (sum % 11);

  if (parseInt(cnpj.charAt(12)) === firstDigit && parseInt(cnpj.charAt(13)) === secondDigit) {
    return true;
  }

  return false;
}