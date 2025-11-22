// install.js
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const tar = require('tar');

// --- Configuration ---
const GITHUB_REPO = 'AungKyawPhyo1142/create-express-cli';
const VERSION = 'v0.2.0';

// --- Platform Detection ---
function getPlatformAndArch() {
    const platform = os.platform();
    const arch = os.arch();
    let goPlatform, goArch;
    if (platform === 'darwin') goPlatform = 'darwin';
    else if (platform === 'linux') goPlatform = 'linux';
    else if (platform === 'win32') goPlatform = 'windows';
    else throw new Error(`Unsupported platform: ${platform}`);

    if (arch === 'x64') goArch = 'amd64';
    else if (arch === 'arm64') goArch = 'arm64';
    else throw new Error(`Unsupported architecture: ${arch}`);

    return { goPlatform, goArch };
}

// --- Main Installation Logic ---
async function install() {
    try {
        const { goPlatform, goArch } = getPlatformAndArch();
        const binaryName = goPlatform === 'windows' ? 'create-express-cli.exe' : 'create-express-cli';
        // Extract version number from VERSION (remove 'v' prefix if present)
        const versionNumber = VERSION.startsWith('v') ? VERSION.slice(1) : VERSION;
        const archiveName = `create-express-cli_${versionNumber}_${goPlatform}_${goArch}.tar.gz`;
        const downloadUrl = `https://github.com/${GITHUB_REPO}/releases/download/${VERSION}/${archiveName}`;
        const binDir = path.join(__dirname, 'bin');
        if (!fs.existsSync(binDir)) {
            fs.mkdirSync(binDir);
        }
        const binaryPath = path.join(binDir, binaryName);

        const download = (url, callback) => {
            https.get(url, (response) => {
                if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    console.log(`Redirecting to ${response.headers.location}`);
                    return download(response.headers.location, callback);
                }
                if (response.statusCode === 200) {
                    callback(response);
                } else {
                    console.error(`Failed to download binary: Received status code ${response.statusCode}`);
                    process.exit(1);
                }
            }).on('error', (err) => {
                console.error('Error downloading binary:', err);
                process.exit(1);
            });
        };

        console.log(`Downloading binary from ${downloadUrl}`);

        download(downloadUrl, (response) => {
            response
                .pipe(
                    tar.x({
                        // C is for 'change directory'. We extract into the ./bin folder.
                        C: binDir,
                        // Filter to only extract the binary file itself
                        filter: (filePath) => filePath.includes(binaryName),
                    }),
                )
                .on('finish', () => {
                    if (goPlatform !== 'windows') {
                        fs.chmodSync(binaryPath, '755');
                    }
                    console.log(`✅ create-express-cli successfully installed at ${binaryPath}`);
                });
        });

    } catch (error) {
        console.error('Installation failed:', error);
        process.exit(1);
    }
}

// Run the installation
install();