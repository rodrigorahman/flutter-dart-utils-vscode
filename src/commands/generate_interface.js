const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');

async function generateInterface(uri) {
    const interfaceName = await promptForFeatureName("Interface Name");
    let wsedit = new vscode.WorkspaceEdit();
    const path = `${uri.path}/${interfaceName}.dart`;
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