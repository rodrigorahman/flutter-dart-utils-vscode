const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
// const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder } = require('../commands/wrap-with');
const { createFile } = require('../commands/create_file');
const path = require('path');

async function mvnfeature(uri) {
	const featureName = await promptForFeatureName("MVC Feature Name");
	if (featureName) {
		mkdirp(path.join(uri.fsPath , featureName));
		const baseUrl = path.join(uri.fsPath , featureName);
		mkdirp(path.join(baseUrl , '/model')).catch((err) => console.log(err));
		mkdirp(path.join(baseUrl , '/view_models')).catch((err) => console.log(err));
		mkdirp(path.join(baseUrl , '/view')).catch((err) => console.log(err));
		mkdirp(path.join(baseUrl , '/controller')).catch((err) => console.log(err));
	}

}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Feature 3 Tiers Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}
module.exports = {mvnfeature}