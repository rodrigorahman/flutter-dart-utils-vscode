// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand("extension.clean-architecture-folders", async function (uri) {
		const featureName = await promptForFeatureName();
		if (featureName) {
			mkdirp(uri.fsPath + '/' + featureName)
			const baseUrl = uri.fsPath + '/' + featureName
			mkdirp(baseUrl + '/data')
				.then(() => {
					mkdirp(baseUrl + '/data/datasource')
					mkdirp(baseUrl + '/data/drivers')
				})
				.catch((err) => console.log(err));
			mkdirp(baseUrl + '/infra').then(() => {
				mkdirp(baseUrl + '/infra/repository')
				mkdirp(baseUrl + '/infra/datasources')
				mkdirp(baseUrl + '/infra/models')
			})

			mkdirp(baseUrl + '/domain')
				.then(() => {
					mkdirp(baseUrl + '/domain/entities')
					mkdirp(baseUrl + '/domain/repositories')
					mkdirp(baseUrl + '/domain/usecases')
				})
				.catch((err) => console.log(err));

			mkdirp(baseUrl + '/presentation')
				.then(() => {
					mkdirp(baseUrl + '/presentation/controllers')
					mkdirp(baseUrl + '/presentation/models')
					mkdirp(baseUrl + '/presentation/usecases')
				})
				.catch((err) => console.log(err));
		}
	});

	let cleanForFlutter = vscode.commands.registerCommand("extension.clean-architecture-folders-for-flutter", async function (uri) {
		const featureName = await promptForFeatureName();
		if (featureName) {
			mkdirp(uri.fsPath + '/' + featureName)
			const baseUrl = uri.fsPath + '/' + featureName
			mkdirp(baseUrl + '/data')
				.then(() => {
					mkdirp(baseUrl + '/data/datasource')
				})
				.catch((err) => console.log(err));

			mkdirp(baseUrl + '/infra').then(() => {
				mkdirp(baseUrl + '/infra/repository')
				mkdirp(baseUrl + '/infra/datasources')
				mkdirp(baseUrl + '/infra/models')
			})

			mkdirp(baseUrl + '/domain')
				.then(() => {
					mkdirp(baseUrl + '/domain/entities')
					mkdirp(baseUrl + '/domain/datasource')
					mkdirp(baseUrl + '/domain/usecases')
				})
				.catch((err) => console.log(err));

			mkdirp(baseUrl + '/presentation')
				.then(() => {
					mkdirp(baseUrl + '/presentation/pages')
					mkdirp(baseUrl + '/presentation/usecases')
				})
				.catch((err) => console.log(err));
		}

	});

	let disposableGenerateTest = vscode.commands.registerCommand('extension.generateTestFile', async (uri) => {
		const pathTest = uri.fsPath.replace('/lib/', '/test/');
		mkdirp(pathTest)
		vscode.window.showInformationMessage('Test Folder Generate' + pathTest);
	});


	const createInterface = vscode.commands.registerCommand('extension.generateInterface', async (uri) => {
		const interfaceName = await promptForFeatureName();
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
	});

	const createClass = vscode.commands.registerCommand('extension.generateClass', async (uri) => {
		const className = await promptForFeatureName();
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
	});

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ pattern: "**/*.{dart,dartx}", scheme: "file" },
			new CodeActionProvider()
		)
	);

	const implementsInterface = vscode.commands.registerCommand('extension.implementsInterface', async () => {
		let editor = vscode.window.activeTextEditor;
		const textFile = editor.document.getText();

		const indexStart = textFile.indexOf('abstract class ');
		const indexEnd = textFile.indexOf(' {');
		const interfaceName = textFile.substr(indexStart, indexEnd - indexStart).replace('abstract class', '').replace(' {', '');
		const implementationName = interfaceName.replace('I', '');
		let wsedit = new vscode.WorkspaceEdit();
		const basePath = editor.document.uri.path.replace(`/${_.snakeCase(interfaceName)}.dart`, '/');
		// const basePath = await promptForPathName(editor.document.uri.path.replace(`/${_.snakeCase(interfaceName)}.dart`, '/'));
		if (basePath) {
			const path = `${basePath}/${_.snakeCase(implementationName)}.dart`;
			const filePath = vscode.Uri.file(path);
			wsedit.createFile(filePath);
			vscode.workspace.applyEdit(wsedit);
			fs.writeFileSync(path, `import './${_.snakeCase(interfaceName)}.dart';
	
class${implementationName} implements ${interfaceName} {

}`, 'utf8');

			vscode.workspace.openTextDocument(path).then(async doc => {
				vscode.window.showTextDocument(doc);
			});

		}
	});



	let threeTiersFolders = vscode.commands.registerCommand("extension.3-tiers", async function (uri) {
		const featureName = await promptForFeatureName();
		if (featureName) {
			mkdirp(uri.fsPath + '/' + featureName)
			const baseUrl = uri.fsPath + '/' + featureName
			mkdirp(baseUrl + '/data').catch((err) => console.log(err));
			mkdirp(baseUrl + '/controller').catch((err) => console.log(err));
			mkdirp(baseUrl + '/service').catch((err) => console.log(err));
			mkdirp(baseUrl + '/view_models').catch((err) => console.log(err));
		}

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableGenerateTest);
	context.subscriptions.push(cleanForFlutter);
	context.subscriptions.push(createInterface);
	context.subscriptions.push(createClass);
	context.subscriptions.push(implementsInterface);
	context.subscriptions.push(threeTiersFolders);
}


class CodeActionProvider {
	provideCodeActions() {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return [];
		}


		const textFile = editor.document.getText();
		const codeActions = [];
		if (textFile.includes('abstract')) {
			codeActions.push({
				command: "extension.implementsInterface",
				title: "Implements interface"
			});
		}
		return codeActions;
	}
}

function promptForFeatureName() {
	const FeatureNamePromptOptions = {
		prompt: "Feature Clean Architecture Name",
		placeHolder: "Feature Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}


exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }


module.exports = {
	activate,
	deactivate
}


