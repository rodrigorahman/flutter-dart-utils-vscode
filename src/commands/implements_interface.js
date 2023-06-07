const vscode = require('vscode');
const fs = require('fs');
const pathImp = require('path');
const _ = require('lodash');
const { isDart3 } = require('../utils/getDartSdkVersion');
const { getContentTemplate } = require('./templates/read_file_template');

async function implementsInterface(uri) {
    let editor = vscode.window.activeTextEditor;
    const textFile = editor.document.getText();

    let stringSearch = 'abstract class ';
    if (isDart3()) {
        stringSearch = 'interface class ';

        if (textFile.includes('abstract interface')) {
            stringSearch = 'abstract interface class ';
        }
    }

    const indexStart = textFile.lastIndexOf(stringSearch);
    let indexEnd = textFile.indexOf(' {');

    if (indexEnd === -1) {
        indexEnd = textFile.indexOf('{');
    }

    if (indexEnd === -1) {
        vscode.window.showErrorMessage('please format the code before running the implements interface');
        return;
    }

    if (textFile.includes('extends')) {
        indexEnd = textFile.indexOf(' extends');
    } else if (textFile.includes('with')) {
        indexEnd = textFile.indexOf(' with');
    }

    let interfaceName = textFile.substring(indexStart, indexEnd).replace(stringSearch, ' ').replace(' {', '');
    interfaceName = interfaceName.trimEnd();
    const configType = vscode.workspace.getConfiguration("generate").get("template.type");
    let implementationName = interfaceName.trim();
    if (configType === 'I Prefix') {
        implementationName = interfaceName.replace('I', '');
    } else if (configType === 'Clean Code') {
        implementationName = interfaceName + 'Impl';
    } else {
        let suffixClass = await promptForFeatureName();
        if (suffixClass == undefined) {
            return;
        } else if (suffixClass === '') {
            suffixClass = 'Impl';
        }
        implementationName = interfaceName + suffixClass;
    }

    let wsedit = new vscode.WorkspaceEdit();
    const basePath = editor.document.uri.fsPath.replace(`${_.snakeCase(interfaceName)}.dart`, '');
    if (basePath) {
        const path = `${basePath}/${_.snakeCase(implementationName)}.dart`;
        const filePath = vscode.Uri.file(path);
        wsedit.createFile(filePath);
        vscode.workspace.applyEdit(wsedit);
        let templateClass = getContentTemplate(pathImp.join('dart','class_implements.template'));

        templateClass = templateClass.replace("##IMPORT_NAME##", _.snakeCase(interfaceName));
        templateClass = templateClass.replace("##CLASS_NAME##", implementationName.trim());
        templateClass = templateClass.replace("##INTERFACE_NAME##", interfaceName.trim());


        fs.writeFileSync(path, templateClass, 'utf-8');


        vscode.workspace.openTextDocument(path).then(async doc => {
            vscode.window.showTextDocument(doc);
        });

    }
}

function promptForFeatureName() {
    const FeatureNamePromptOptions = {
        prompt: 'Choice suffix name, if empty then add Impl',
        placeHolder: "Choice suffix name",
        describe: 'teste'
    };
    return vscode.window.showInputBox(FeatureNamePromptOptions);
}


module.exports = { implementsInterface };