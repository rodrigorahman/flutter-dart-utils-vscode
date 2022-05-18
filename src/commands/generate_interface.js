const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');

async function generateInterface(uri) {
    let interfaceName = await promptForFeatureName("Interface Name");
    if(!interfaceName){
        vscode.window.showInformationMessage('Creating a Dart Interface Canceled');
        return;
    }
    let wsedit = new vscode.WorkspaceEdit();
    const configType = vscode.workspace.getConfiguration("generate").get("template.type");
    if(configType == 'I Prefix') {
        if(!interfaceName.startsWith('i_')){
            interfaceName = `i_${interfaceName}`;
        }
    }

    const path = `${uri.fsPath}/${interfaceName}.dart`;
    const filePath = vscode.Uri.file(path);
    wsedit.createFile(filePath);
    vscode.workspace.applyEdit(wsedit);
    const interfaceNameFile = _.upperFirst(_.camelCase(interfaceName));

    fs.writeFileSync(path, `abstract class ${interfaceNameFile} {

}`, 'utf8');
    vscode.workspace.openTextDocument(path).then(doc => {
        vscode.window.showTextDocument(doc);
    });
    vscode.window.showInformationMessage('Created a Dart Interface');
}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Interface Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}

module.exports = {generateInterface};