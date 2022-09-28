const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function implementsInterface(uri) {
    let editor = vscode.window.activeTextEditor;
    const textFile = editor.document.getText();


    const indexStart = textFile.lastIndexOf('abstract class ');
    let indexEnd = textFile.indexOf(' {');

    if (textFile.includes('extends')) {
        indexEnd = textFile.trim().indexOf(' extends');
    } else if (textFile.includes('with')) {
        indexEnd = textFile.trim().indexOf(' with');
    }

    let interfaceName = textFile.substring(indexStart, indexEnd).replace('abstract class', '').replace(' {', '');
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
        fs.writeFileSync(path, `import './${_.snakeCase(interfaceName)}.dart';

class${implementationName} implements${interfaceName} {

}`, 'utf8');

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