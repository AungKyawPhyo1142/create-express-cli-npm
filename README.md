<h3 align="center">The one-stop solution for scaffolding production-ready Express.js applications.</h3>

<p align="center">
<a href="https://www.npmjs.com/package/@aungkyawphyo/create-express-app"><img src="https://img.shields.io/npm/v/@aungkyawphyo/create-express-app.svg" alt="NPM Version"></a>
<a href="https://github.com/AungKyawPhyo1142/create-express-cli/blob/main/LICENSE"><img src="https://img.shields.io/github/license/AungKyawPhyo1142/create-express-cli" alt="License"></a>
</p>

# Create Express CLI

A Golang-powered CLI tool to instantly scaffold a ready-to-use **Express.js** application with **TypeScript** by default — so you can skip repetitive setup and jump straight into coding.

# Motivation behind this project
I’m way too lazy to set up the same Express project every time.  
So instead of doing `npm init` + installing packages + writing the same boilerplate for the millionth time,
I made this.

## 🚀 Features
- Generate a **TypeScript** Express app by default (JavaScript available via `--javascript` flag).
- Preconfigured middleware, routes, and project structure.
- Automatic `npm install` after scaffolding.
- Supports TypeScript and JavaScript templates.
- Clean and maintainable Golang CLI architecture.



## 📦 Getting Started (Recommended)

The easiest way to use `create-express-app` is with `npx`, which comes bundled with Node.js.

Open your terminal and run the following command:

```bash
npx @aungkyawphyo/create-express-app my-awesome-project
```

This single command will download the CLI, create a new directory named my-awesome-project, and scaffold your new **TypeScript** Express application inside it.

To create a JavaScript project instead, use the `--javascript` flag:

```bash
npx @aungkyawphyo/create-express-app my-awesome-project --javascript
```


# Usage
Once your project is created, navigate into the new directory and start the development server:
```bash
cd my-awesome-project
npm run dev
```

# 🛠️ Development & Contributing
Interested in contributing to this project? I'd love to have you!

To get started, clone [this repository](https://github.com/AungKyawPhyo1142/create-express-cli.git) and build the project from source.
```bash
# Clone the repository
git clone https://github.com/AungKyawPhyo1142/create-express-cli.git
cd create-express-cli

# Build the executable
go build
```

# 📜 License
This project is open source and licensed under the MIT License.