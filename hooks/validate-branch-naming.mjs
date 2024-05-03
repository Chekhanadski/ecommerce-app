import { exec } from 'child_process';

exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
  if (err) {
    throw new Error(err);
  }

  if (!/RSS-ECOMM-[0-9]+_[0-9-]+[a-zA-Z]+/.test(stdout.trim())) {
    throw new Error('The branch name is not valid!');
  }
});
