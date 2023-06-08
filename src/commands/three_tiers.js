const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
// const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder } = require('../commands/wrap-with');
const { createFile } = require('../commands/create_file');
const path = require('path');

async function three_tiers(uri) {
	const featureName = await promptForFeatureName("Feature 3 Tiers Name");
	if (featureName) {
		mkdirp(path.join(uri.fsPath, featureName))
		const baseUrl = path.join(uri.fsPath , featureName);
		mkdirp(path.join(baseUrl ,'/data')).catch((err) => console.log(err));
		mkdirp(path.join(baseUrl ,'/controller')).catch((err) => console.log(err));
		mkdirp(path.join(baseUrl ,'/service')).catch((err) => console.log(err));
		mkdirp(path.join(baseUrl ,'/view_models')).catch((err) => console.log(err));
	}

}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Feature 3 Tiers Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}
module.exports = {three_tiers}