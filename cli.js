#!/usr/bin/env node
const { spawn } = require('child_process');
const path = require('path');
const os = require('os');

// Get the path to the Go binary.
const binaryName = os.platform() === 'win32' ? 'create-express-cli.exe' : 'create-express-cli';
const binaryPath = path.join(__dirname, 'bin', binaryName);

// Get the arguments passed to the npm command, excluding 'node' and the script name.
const args = process.argv.slice(2);

// Execute the Go binary with the 'create' subcommand and the rest of the arguments.
// The `stdio: 'inherit'` option pipes the output from the Go app directly to the user's terminal.
const child = spawn(binaryPath, ['create', ...args], { stdio: 'inherit' });

// Handle closing the process.
child.on('close', code => {
  process.exit(code);
});