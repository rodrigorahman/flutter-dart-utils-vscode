const vscode = require('vscode');
const mkdirp = require('mkdirp');

async function generateTestFile(uri)  {
    const pathTest = uri.fsPath.replace('/lib/', '/test/');
    mkdirp(pathTest)
    vscode.window.showInformationMessage('Test Folder Generate' + pathTest);
}

module.exports = {generateTestFile};