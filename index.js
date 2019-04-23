#!/usr/bin/env node
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const child_process = require("child_process");
const fs = require('fs');

const dependency = [
    "@babel/polyfill",
    "@babel/register",
    "cookie-parser",
    "debug",
    "express",
    "http-errors",
    "morgan",
    "node-sass",
    "pug",
    "react",
    "react-dom",
    "react-redux",
    "react-router-dom",
    "redux",
    "redux-thunk"
];

const devDependency = [
    "@babel/cli",
    "@babel/core",
    "@babel/node",
    "@babel/preset-env",
    "@babel/preset-react",
    "babel-loader",
    "babel-plugin-transform-class-properties",
    "clean-webpack-plugin",
    "concurrently",
    "css-loader",
    "eslint",
    "eslint-config-airbnb",
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "html-loader",
    "html-webpack-plugin",
    "nodemon",
    "sass-loader",
    "style-loader",
    "url-loader",
    "webpack",
    "webpack-cli",
    "webpack-dev-server"
];

const welcome = () => {
    console.log(
        chalk.green(
            figlet.textSync("AD React Init", {
                font: "Ghost",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const init = () => {
    child_process.execSync('npm init', {stdio: 'inherit'});
};

const readPackageJson = () => {
    this.package = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
};

const configurePackageJson = () => {
    this.package.scripts = {
        ...this.package.scripts,
        "prestart": "npm run build:prod",
        "start": "node src/server/bin/www",
        "start:dev": "npm run build:dev && nodemon src/server/bin/www",
        "build:dev": "webpack --mode development",
        "build:prod": "webpack --mode production",
        "client": "webpack-dev-server --mode development",
        "server": "nodemon src/server/bin/www",
        "dev": "concurrently \"npm run server\" \"npm run client\""
    };
    fs.writeFileSync("package.json", JSON.stringify(this.package), {encoding:'utf8',flag:'w'});
};

const copyPackage = () => {
    shell.cp('-Rf', [`${__dirname}/lib/*`], `./`);
    shell.cp('-Rf', [`${__dirname}/lib/.babelrc`], `./`);
    shell.cp('-Rf', [`${__dirname}/lib/.eslintrc.json`], `./`);
    shell.cp('-Rf', [`${__dirname}/lib/.gitignore`], `./`);
};

const installDependency = () => {
    console.log("Installing Dependency....");
    child_process.execSync(`npm i --save ${dependency.join(' ')}`, {stdio: 'inherit'});
    child_process.execSync(`npm i --save-dev ${devDependency.join(' ')}`, {stdio: 'inherit'});
};

const success = (projectName) => {
    console.log(
        chalk.white.bgGreen.bold(`${projectName} Created! Happy Coding!`)
    );
};
const run = async () => {

    welcome();

    init();

    readPackageJson();

    configurePackageJson();

    copyPackage();

    installDependency();

    success(this.package.name);
};

run();
