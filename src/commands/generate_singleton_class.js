const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function generateSingletonClass(uri) {
    const className = await promptForFeatureName("Class Name");
    if (!className) {
        vscode.window.showInformationMessage('Creating a Dart Class Canceled');
        return;
    }
    let wsedit = new vscode.WorkspaceEdit();
    const path = `${uri.fsPath}/${className}.dart`;
    const filePath = vscode.Uri.file(path);
    wsedit.createFile(filePath);
    vscode.workspace.applyEdit(wsedit);
    const singletonNameFile = _.upperFirst(_.camelCase(className));

    fs.writeFileSync(path, `class ${singletonNameFile} {
        static ${singletonNameFile}? _instance;
        // Avoid self instance
        ${singletonNameFile}._();
        static ${singletonNameFile} get instance => _instance ??= ${singletonNameFile}._();
}`, 'utf8');
    vscode.workspace.openTextDocument(path).then(doc => {
        vscode.window.showTextDocument(doc);
    });
    vscode.window.showInformationMessage('Created a Dart Singleton Class');
}

function promptForFeatureName(prompt) {
    const FeatureNamePromptOptions = {
        prompt: prompt,
        placeHolder: "Class Name"
    };
    return vscode.window.showInputBox(FeatureNamePromptOptions);
}

module.exports = {
    generateSingletonClass
};