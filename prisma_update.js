const { execSync } = require('child_process');
try {
  console.log('Pushing to db...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('Generating client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('Done!');
} catch (error) {
  console.error('Error:', error.message);
}
