// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const mkdirp = require('mkdirp');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flutter-dart-utils" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('flutter-dart-utils.helloWorld', function () {
	// 	// The code you place here will be executed every time your command is executed

	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from flutter_dart_utils!');
	// });


	let disposable = vscode.commands.registerCommand("extension.clean-architecture-folders", async function (uri) {
		const featureName = await promptForFeatureName();
		if (featureName) {
			mkdirp(uri.fsPath + '/' + featureName)
			const baseUrl = uri.fsPath + '/' + featureName
			mkdirp(baseUrl + '/data')
				.then(() => {
					mkdirp(baseUrl + '/data/datasource')
					mkdirp(baseUrl + '/data/repository')
				})
				.catch((err) => console.log(err));

			mkdirp(baseUrl + '/domain')
				.then(() => {
					mkdirp(baseUrl + '/domain/entities')
					mkdirp(baseUrl + '/domain/ports')
					mkdirp(baseUrl + '/domain/usecases')
				})
				.catch((err) => console.log(err));

			mkdirp(baseUrl + '/presentation')
				.then(() => {
					mkdirp(baseUrl + '/presentation/controllers')
					mkdirp(baseUrl + '/presentation/models')
				})
				.catch((err) => console.log(err));
		}

	});

	context.subscriptions.push(disposable);
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


