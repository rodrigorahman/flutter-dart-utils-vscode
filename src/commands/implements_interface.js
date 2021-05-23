const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function implementsInterface(uri) {
    let editor = vscode.window.activeTextEditor;
    const textFile = editor.document.getText();

    const indexStart = textFile.indexOf('abstract class ');
    const indexEnd = textFile.indexOf(' {');
    const interfaceName = textFile.substr(indexStart, indexEnd - indexStart).replace('abstract class', '').replace(' {', '');
    
    const configType = vscode.workspace.getConfiguration("generate").get("template.type");
    let implementationName = interfaceName;
    if(configType === 'I Prefix') {
        implementationName = interfaceName.replace('I', '');
    } else if(configType === 'Clean Code') {
        implementationName = interfaceName + 'Impl';
    } else {
        let suffixClass = await promptForFeatureName();
        if(suffixClass == undefined) {
            return;
        }else if(suffixClass === '') {
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


module.exports = {implementsInterface};