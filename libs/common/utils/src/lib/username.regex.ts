export const usernamePattern = /^(?!.*[\s])(?!^\d)(?!.*[A-Z])(?!.*[^a-zA-Z0-9_.]).{4,20}$/;

export function isValidUsername(username: string): boolean {
  return usernamePattern.test(username);
}
