function base64Encode(string: string): string {
  return Buffer.from(string).toString('base64')
}
function base64Decode(base64String: string): string {
  return Buffer.from(base64String, 'base64').toString('utf-8')
}

export const str = {
  base64Encode,
  base64Decode
}
