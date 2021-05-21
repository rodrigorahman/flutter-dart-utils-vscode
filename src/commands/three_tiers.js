const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
// const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder } = require('../commands/wrap-with');
const { createFile } = require('../commands/create_file');

async function three_tiers(uri) {
	const featureName = await promptForFeatureName("Feature 3 Tiers Name");
	if (featureName) {
		mkdirp(uri.fsPath + '/' + featureName)
		const baseUrl = uri.fsPath + '/' + featureName
		mkdirp(baseUrl + '/data').catch((err) => console.log(err));
		mkdirp(baseUrl + '/controller').catch((err) => console.log(err));
		mkdirp(baseUrl + '/service').catch((err) => console.log(err));
		mkdirp(baseUrl + '/view_models').catch((err) => console.log(err));
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