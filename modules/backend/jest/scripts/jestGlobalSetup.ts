import shell from 'shelljs'
const path = require('path')

export default async (): Promise<void> => {
  shell.exec(`bash ${path.join(__dirname, './init-test-env.sh')}`)
  process.env.DATABASE_URL =
    // eslint-disable-next-line no-secrets/no-secrets
    'postgresql://test:password@localhost:5434/iprotect?schema=public'
}
