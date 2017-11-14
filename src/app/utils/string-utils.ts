export class StringUtils {
  static hasText(input: string): boolean {
    return !!(input && input.trim());
  }
}
