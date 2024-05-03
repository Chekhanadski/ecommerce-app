import { exec } from 'child_process'

exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
  if (err) {
    throw new Error(err)
  }

  if (!(typeof stdout === 'string')) {
    throw new Error('The branch name is not valid!')
  }
})
