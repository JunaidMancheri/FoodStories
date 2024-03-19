export function isDevelopmentMode() {
  return process.env['NODE_ENV'] === 'production' ? false : true;
}
