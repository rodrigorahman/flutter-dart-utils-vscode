const vscode = require('vscode');

async function createFile(fileName) {
	let wsedit = new vscode.WorkspaceEdit();
	const filePath = vscode.Uri.file(fileName);
	wsedit.createFile(filePath);
	await vscode.workspace.applyEdit(wsedit);
}

module.exports = {createFile}