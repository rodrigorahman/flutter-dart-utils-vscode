const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const { createFile } = require('../commands/create_file');

async function modularInitialConfig(uri) {

    const basePathName = await promptForFeatureName("Specify the base folder of your project (app, src, or /). Leave it blank to add it to the src folder.", "src") || 'src';
    const basePath = uri.fsPath;

    mkdirp(`${basePath}/${basePathName}/modules/home/`);

    const mainDartFile = `${basePath}/main.dart`;
    const appModuleDartFile = `${basePath}/${basePathName}/app_module.dart`;
    const appWidgetDartFile = `${basePath}/${basePathName}/app_widget.dart`;
    const homePageDartFile = `${basePath}/${basePathName}/modules/home/home_page.dart`;

    await createFile(mainDartFile);
    await createFile(appModuleDartFile);
    await createFile(appWidgetDartFile);
    await createFile(homePageDartFile);


    const baseExtensionPath = vscode.extensions.getExtension('RodrigoRahman.flutter-dart-utils').extensionPath;
    const basePathTemplate = `${baseExtensionPath}/src/commands/templates/modular`;
    
    createFileByTemplate(`${basePathTemplate}/main.template`, mainDartFile, basePathName);
    createFileByTemplate(`${basePathTemplate}/app_module.template`, appModuleDartFile, basePathName);
    createFileByTemplate(`${basePathTemplate}/app_widget.template`, appWidgetDartFile, basePathName);
    createFileByTemplate(`${basePathTemplate}/home_page.template`, homePageDartFile, basePathName);
    
}

function promptForFeatureName(prompt, placeHolder = 'Feature Name') {
    const FeatureNamePromptOptions = {
        prompt: prompt,
        placeHolder: placeHolder
    };
    return vscode.window.showInputBox(FeatureNamePromptOptions);
}

function createFileByTemplate(templatePath, filePath, basePath) {
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        
        const bodyFile = data.replace(/##BASE_PATH##/g, basePath);
        fs.writeFile(filePath, bodyFile, { flag: 'w' }, (err) => {
            if (err) throw err;
            console.log('Arquivo salvo com sucesso!');
        });
    });
}

module.exports = { modularInitialConfig };