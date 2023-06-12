const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getContentTemplate } = require('./templates/read_file_template');

async function fvmConfigure(uri) {
    const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const folder = path.join(rootPath, '.vscode');
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder)
    }
    const templateSettings = getContentTemplate(path.join('fvm', 'settings.template'));
    fs.writeFileSync(path.join(folder, 'settings.json'), templateSettings, 'utf-8');
    fs.appendFileSync(path.join(rootPath, ".gitignore"), '\n\n.fvm/flutter_sdk')
    vscode.window.showInformationMessage('FVM configured successfully')
}
module.exports = { fvmConfigure };