const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function generateClass(uri) {
    const className = await promptForFeatureName("Class Name");
    let wsedit = new vscode.WorkspaceEdit();
    const path = `${uri.path}/${className}.dart`;
    const filePath = vscode.Uri.file(path);
    wsedit.createFile(filePath);
    vscode.workspace.applyEdit(wsedit);
    const interfaceNameFile = _.upperFirst(_.camelCase(className));
    fs.writeFileSync(path, `class ${interfaceNameFile} {

}`, 'utf8');
    vscode.workspace.openTextDocument(path).then(doc => {
        vscode.window.showTextDocument(doc);
    });
    vscode.window.showInformationMessage('Created a Dart Class');
}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Class Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}

module.exports = {generateClass};