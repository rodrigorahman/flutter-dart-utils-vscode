// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder, wrapWithLayoutBuilder, wrapWithBuilder, wrapWithObxGetX, wrapWithGetx } = require('./commands/wrap-with');
const { getXNewFeature } = require('./commands/getx_new_feature');
const { createCleanArchFolders } = require('./commands/clean_arch_folders');
const { createCleanArchFoldersForFlutter } = require('./commands/clean_arch_folders_for_flutter');
const { generateTestFile } = require('./commands/generate_test_file');
const { generateInterface } = require('./commands/generate_interface');
const { generateClass } = require('./commands/generate_class');
const { generateStatelessWidget } = require('./commands/generate_stateless_widget');
const { generateStatefulWidget } = require('./commands/generate_stateful_widget');
const { implementsInterface: implementsInterfaceFun } = require('./commands/implements_interface');
const { three_tiers } = require('./commands/three_tiers');
const { mvnfeature } = require('./commands/mvc_feature');
const { modularNewFeature } = require('./commands/modular_new_feature');

/**
 * @param {vscode.ExtensionContext} context
 */

// const DART_MODE = { language: "dart", scheme: "file" };


function activate(context) {

	const modularfeature = vscode.commands.registerCommand("extension.modularfeature", modularNewFeature);
	const getxfeature = vscode.commands.registerCommand("extension.getxfeature", getXNewFeature);

	const disposable = vscode.commands.registerCommand("extension.clean-architecture-folders", createCleanArchFolders);

	const cleanForFlutter = vscode.commands.registerCommand("extension.clean-architecture-folders-for-flutter", createCleanArchFoldersForFlutter);

	const disposableGenerateTest = vscode.commands.registerCommand('extension.generateTestFile', generateTestFile);

	const createInterface = vscode.commands.registerCommand('extension.generateInterface', generateInterface);

	const createClass = vscode.commands.registerCommand('extension.generateClass', generateClass);
	const createStatelessWidget = vscode.commands.registerCommand('extension.generateStatelessWidget', generateStatelessWidget);
	const createStatefulWidget = vscode.commands.registerCommand('extension.generateStatefulWidget', generateStatefulWidget);

	const implementsInterface = vscode.commands.registerCommand('extension.implementsInterface', implementsInterfaceFun);

	const threeTiersFolders = vscode.commands.registerCommand("extension.3-tiers", three_tiers);

	const MVCFlutterFolders = vscode.commands.registerCommand("extension.mvc-feature", mvnfeature);

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider(
			{ pattern: "**/*.{dart,dartx}", scheme: "file" },
			new CodeActionProvider()
		),
		disposable,
		disposableGenerateTest,
		cleanForFlutter,
		createInterface,
		createClass,
		createStatelessWidget,
		createStatefulWidget,
		implementsInterface,
		threeTiersFolders,
		MVCFlutterFolders,
		vscode.commands.registerCommand('extension.fu-wrap-with-value-notifier', wrapWithValueListenableBuilder),
		vscode.commands.registerCommand('extension.fu-wrap-with-consumer', wrapWithProviderConsumerBuilder),
		vscode.commands.registerCommand('extension.fu-wrap-with-observer', wrapWithMobXObserverBuilder),
		vscode.commands.registerCommand('extension.fu-wrap-with-layout-builder', wrapWithLayoutBuilder),
		vscode.commands.registerCommand('extension.fu-wrap-with-builder', wrapWithBuilder),
		vscode.commands.registerCommand('extension.fu-wrap-with-obx-getx', wrapWithObxGetX),
		vscode.commands.registerCommand('extension.fu-wrap-with-getx', wrapWithGetx),
		getxfeature,
		modularfeature,

	);

	// context.subscriptions.push(disposable);
	// context.subscriptions.push(disposableGenerateTest);
	// context.subscriptions.push(cleanForFlutter);
	// context.subscriptions.push(createInterface);
	// context.subscriptions.push(createClass);
	// context.subscriptions.push(implementsInterface);
	// context.subscriptions.push(threeTiersFolders);
	// context.subscriptions.push(MVCFlutterFolders);
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

		const pickedText = editor.document.getText(editor.selection);

		if (pickedText === '') return codeActions;
		codeActions.push(
			{
				command: "extension.fu-wrap-with-layout-builder",
				title: "Wrap with LayoutBuilder"
			}
		);
		codeActions.push(
			{
				command: "extension.fu-wrap-with-builder",
				title: "Wrap with Builder"
			}
		);

		codeActions.push(
			{
				command: "extension.fu-wrap-with-obx-getx",
				title: "Wrap with Obx"
			}
		);
		
		codeActions.push(
			{
				command: "extension.fu-wrap-with-getx",
				title: "Wrap with GetX"
			}
		);
		
		codeActions.push(
			{
				command: "extension.fu-wrap-with-value-notifier",
				title: "Wrap with ValueListenableBuilder"
			});
		codeActions.push(
			{
				command: "extension.fu-wrap-with-consumer",
				title: "Wrap with Consumer"
			}
		);
		codeActions.push(
			{
				command: "extension.fu-wrap-with-observer",
				title: "Wrap with MobX Observer"
			}
		);

		return codeActions;
	}
}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Feature Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}


// this method is called when your extension is deactivated
function deactivate() { }


module.exports = {
	activate,
	deactivate
}


