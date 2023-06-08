const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
// const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder } = require('../commands/wrap-with');
const { createFile } = require('./create_file');
const path = require('path');

async function createCleanArchFoldersForFlutter(uri) {
    const featureName = await promptForFeatureName("Feature Clean Architecture Name");
    if (featureName) {
        mkdirp(path.join(uri.fsPath , featureName))
        const baseUrl = path.join(uri.fsPath , featureName);
        mkdirp(path.join(baseUrl, '/data'))
            .then(() => {
                mkdirp(path.join(baseUrl, '/data/datasource'))
            })
            .catch((err) => console.log(err));

        mkdirp(path.join(baseUrl, '/infra')).then(() => {
            mkdirp(path.join(baseUrl, '/infra/repository'))
            mkdirp(path.join(baseUrl, '/infra/datasources'))
            mkdirp(path.join(baseUrl, '/infra/models'))
        })

        mkdirp(path.join(baseUrl, '/domain'))
            .then(() => {
                mkdirp(path.join(baseUrl, '/domain/entities'))
                mkdirp(path.join(baseUrl, '/domain/infra'))
                mkdirp(path.join(baseUrl, '/domain/usecases'))
            })
            .catch((err) => console.log(err));

        mkdirp(path.join(baseUrl, '/ui'))
            .catch((err) => console.log(err));

        mkdirp(path.join(baseUrl, '/presenter'))
            .then(() => {
                mkdirp(path.join(baseUrl, '/presenter/controllers'))
                mkdirp(path.join(baseUrl, '/presenter/usecases'))
            })
            .catch((err) => console.log(err));
    }

}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Feature Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}

module.exports = {createCleanArchFoldersForFlutter};