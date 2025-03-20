#!/usr/bin/env node

/**
 * CalcHub Setup Script
 * This script helps set up the CalcHub project by installing dependencies
 * and preparing the development environment.
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Display welcome message
console.log('\n\x1b[34m=================================================\x1b[0m');
console.log('\x1b[1m\x1b[36m  Welcome to CalcHub Setup\x1b[0m');
console.log('\x1b[34m=================================================\x1b[0m\n');
console.log('\x1b[37mThis script will help you set up CalcHub for development.\x1b[0m\n');

// Function to run commands with better error handling
function runCommand(command, errorMessage) {
  try {
    console.log(`\x1b[33mRunning: ${command}\x1b[0m`);
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(`\x1b[31mError: ${errorMessage}\x1b[0m`);
    console.error(`\x1b[31m${error.message}\x1b[0m`);
    return false;
  }
}

// Function to check if a command is available
function commandExists(command) {
  try {
    execSync(`${command} --version`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

// Main setup process
async function setup() {
  // Check if Node.js is installed
  if (!commandExists('node')) {
    console.error('\x1b[31mNode.js is not installed. Please install Node.js v16 or higher.\x1b[0m');
    process.exit(1);
  }

  // Check Node.js version
  const nodeVersion = execSync('node -v').toString().trim();
  const versionMatch = nodeVersion.match(/v(\d+)\./);
  
  if (versionMatch && Number(versionMatch[1]) < 16) {
    console.warn('\x1b[33mWarning: You are using Node.js ' + nodeVersion + '. CalcHub recommends Node.js v16 or higher.\x1b[0m');
    
    const answer = await new Promise(resolve => {
      rl.question('\x1b[37mDo you want to continue anyway? (y/n): \x1b[0m', resolve);
    });
    
    if (answer.toLowerCase() !== 'y') {
      console.log('\x1b[37mSetup aborted. Please update Node.js and try again.\x1b[0m');
      process.exit(0);
    }
  }

  // Install dependencies
  console.log('\n\x1b[36mInstalling dependencies...\x1b[0m');
  if (!runCommand('npm install', 'Failed to install dependencies.')) {
    process.exit(1);
  }

  // Create .env file if it doesn't exist
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    console.log('\n\x1b[36mCreating .env file...\x1b[0m');
    fs.writeFileSync(envPath, 'VITE_APP_NAME=CalcHub\nVITE_APP_VERSION=4.0.0\n');
  }

  // Setup complete
  console.log('\n\x1b[32m✓ Setup completed successfully!\x1b[0m\n');
  console.log('\x1b[37mYou can now start the development server with:\x1b[0m');
  console.log('\x1b[1m  npm start\x1b[0m\n');
  console.log('\x1b[37mOr build for production with:\x1b[0m');
  console.log('\x1b[1m  npm run build\x1b[0m\n');
  
  rl.close();
}

// Run the setup
setup().catch(error => {
  console.error('\x1b[31mAn unexpected error occurred:\x1b[0m', error);
  process.exit(1);
}); 