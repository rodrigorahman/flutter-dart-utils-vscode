// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');
const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder, wrapWithLayoutBuilder, wrapWithBuilder, wrapWithObxGetX, wrapWithGetx, wrapWithSignals } = require('./commands/wrap-with');
const { getXNewFeature } = require('./commands/getx_new_feature');
const { createCleanArchFolders } = require('./commands/clean_arch_folders');
const { createCleanArchFoldersForFlutter } = require('./commands/clean_arch_folders_for_flutter');
const { generateTestFile } = require('./commands/generate_test_file');
const { generateInterface } = require('./commands/generate_interface');
const { generateClass } = require('./commands/generate_class');
const { generateSingletonClass } = require('./commands/generate_singleton_class');
const { generateStatelessWidget } = require('./commands/generate_stateless_widget');
const { generateStatefulWidget } = require('./commands/generate_stateful_widget');
const { implementsInterface: implementsInterfaceFun } = require('./commands/implements_interface');
const { importGist: importGistFun } = require('./commands/import_gist');
const { three_tiers } = require('./commands/three_tiers');
const { mvnfeature } = require('./commands/mvc_feature');
const { modularNewFeature } = require('./commands/modular_new_feature');
const { modularInitialConfig } = require('./commands/modular_initial_config');
const path = require('path');


const { isDart3, isDart } = require('./utils/getDartSdkVersion');
const { inheritClass } = require('./commands/inherit_class');
const { fvmConfigure } = require('./commands/fvm_configure');
const { fvmInstallConfigure } = require('./commands/fvm_install_configure');
const { snakeCaseTransform } = require('./commands/snake_case_transform');
const { jsonSerializableGenerateJsonKey } = require('./commands/json_serializable_generate_json_key');
const { createGetter } = require('./commands/create_getter');



function snippetHit(context) {
	if (isDart3()) {
		saveSnippet(context, 'dart.json', path.join('dart', 'dart3.json'));
		saveSnippet(context, 'flutter.json', path.join('flutter', 'flutter3.10.json'));
	} else {
		saveSnippet(context, 'dart.json', path.join('dart', 'dart2.json'));
		if (isDart("2.17.0")) {
			saveSnippet(context, 'flutter.json', path.join('flutter', 'flutter2.17.json'));
		} else {
			saveSnippet(context, 'flutter.json', path.join('flutter', 'flutter2.json'));
		}

	}
}


function saveSnippet(context, snippetName, snippetFile) {
	const snippetsPath = path.join(context.extensionPath, 'snippets', snippetFile);
	const snippetsContent = fs.readFileSync(snippetsPath, 'utf8');

	const snippetsFinalPath = path.join(context.extensionPath, 'snippets', snippetName);

	fs.writeFileSync(snippetsFinalPath, snippetsContent);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	snippetHit(context);
	const modularfeature = vscode.commands.registerCommand("extension.modularfeature", modularNewFeature);
	const modularInitial = vscode.commands.registerCommand("extension.modulariniital", modularInitialConfig);
	const getxfeature = vscode.commands.registerCommand("extension.getxfeature", getXNewFeature);

	const disposable = vscode.commands.registerCommand("extension.clean-architecture-folders", createCleanArchFolders);

	const cleanForFlutter = vscode.commands.registerCommand("extension.clean-architecture-folders-for-flutter", createCleanArchFoldersForFlutter);

	const disposableGenerateTest = vscode.commands.registerCommand('extension.generateTestFile', generateTestFile);

	const createInterface = vscode.commands.registerCommand('extension.generateInterface', generateInterface);

	const createClass = vscode.commands.registerCommand('extension.generateClass', generateClass);
	const createSingletonClass = vscode.commands.registerCommand('extension.generateSingletonClass', generateSingletonClass);
	const createStatelessWidget = vscode.commands.registerCommand('extension.generateStatelessWidget', generateStatelessWidget);
	const createStatefulWidget = vscode.commands.registerCommand('extension.generateStatefulWidget', generateStatefulWidget);

	vscode.commands.registerCommand('extension.implementsInterface', implementsInterfaceFun);
	vscode.commands.registerCommand('extension.importGist', importGistFun);
	vscode.commands.registerCommand('extension.inheritClass', inheritClass);
	vscode.commands.registerCommand('extension.snakeCaseTransform', snakeCaseTransform);
	vscode.commands.registerCommand('extension.jsonSerializableGenerateJsonKey', jsonSerializableGenerateJsonKey);
	vscode.commands.registerCommand('extension.createGetter', createGetter);

	const threeTiersFolders = vscode.commands.registerCommand("extension.3-tiers", three_tiers);

	const MVCFlutterFolders = vscode.commands.registerCommand("extension.mvc-feature", mvnfeature);
	const fvmConfigureCommand = vscode.commands.registerCommand("extension.fvmConfigure", fvmConfigure);
	const fvmInstallConfigureCommand = vscode.commands.registerCommand("extension.fvmInstallConfigure", fvmInstallConfigure);
	vscode.commands.registerCommand('extension.fu-wrap-with-value-notifier', wrapWithValueListenableBuilder);
	vscode.commands.registerCommand('extension.fu-wrap-with-consumer', wrapWithProviderConsumerBuilder);
	vscode.commands.registerCommand('extension.fu-wrap-with-observer', wrapWithMobXObserverBuilder);
	vscode.commands.registerCommand('extension.fu-wrap-with-layout-builder', wrapWithLayoutBuilder);
	vscode.commands.registerCommand('extension.fu-wrap-with-builder', wrapWithBuilder);
	vscode.commands.registerCommand('extension.fu-wrap-with-obx-getx', wrapWithObxGetX);
	vscode.commands.registerCommand('extension.fu-wrap-with-getx', wrapWithGetx);
	vscode.commands.registerCommand('extension.fu-wrap-with-watch-signals', wrapWithSignals);

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
		createSingletonClass,
		createStatelessWidget,
		createStatefulWidget,
		threeTiersFolders,
		MVCFlutterFolders,
		getxfeature,
		modularfeature,
		modularInitial,
		fvmConfigureCommand,
		fvmInstallConfigureCommand
	);
}


class CodeActionProvider {
	provideCodeActions() {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return [];
		}


		const textFile = editor.document.getText();
		const codeActions = [];


		if (isDart3() && textFile.includes('abstract class')) {
			codeActions.push({ command: 'extension.inheritClass', title: 'Extends Class' })
		}
		
		const pickedText = editor.document.getText(editor.selection);
		
		if(pickedText.length > 2){
			codeActions.push({ command: 'extension.snakeCaseTransform', title: 'Snake Case Transform'});
		}
		
		codeActions.push({ command: 'extension.jsonSerializableGenerateJsonKey', title: 'Add JsonKey from json_serializable'});
		codeActions.push({ command: 'extension.createGetter', title: 'Generate Getter'});
	

		if (textFile.includes(isDart3() ? 'interface' : 'abstract')) {
			codeActions.push({
				command: "extension.implementsInterface",
				title: "Implements interface"
			});
		}

		

		if (textFile === '') {
			codeActions.push({ command: 'extension.importGist', title: 'Import GitHub Gist from id' })
		}


		if (pickedText === '') {
			return codeActions
		};

		if (textFile.includes('build(BuildContext context)') || textFile.includes('build(context)')) {
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
			
			codeActions.push(
				{
					command: "extension.fu-wrap-with-watch-signals",
					title: "Wrap with Watch of Signals"
				}
			);
		}


		return codeActions;
	}
}

// this method is called when your extension is deactivated
function deactivate() { }


module.exports = {
	activate,
	deactivate
}


