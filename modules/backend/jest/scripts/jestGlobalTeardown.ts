import shell from 'shelljs'
const path = require('path')

export default async (): Promise<void> => {
  shell.exec(`bash ${path.join(__dirname, './teardown-test-env.sh')}`)
}
