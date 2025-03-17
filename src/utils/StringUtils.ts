export class StringUtils {
  static onlyNumbers(value: string) {
    return value.replace(/\D/g, '');
  }
}