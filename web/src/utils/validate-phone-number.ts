export function isValidPhoneFormat(phone:string) {
  phone = phone.replace(/[^\d]+/g, "");
  return phone.length === 11 || phone.length === 10;
}