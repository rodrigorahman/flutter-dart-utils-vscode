const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
// const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder } = require('../commands/wrap-with');
const { createFile } = require('./create_file');

async function createCleanArchFoldersForFlutter(uri) {
    const featureName = await promptForFeatureName("Feature Clean Architecture Name");
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
                mkdirp(baseUrl + '/domain/infra')
                mkdirp(baseUrl + '/domain/usecases')
            })
            .catch((err) => console.log(err));

        mkdirp(baseUrl + '/ui')
            .catch((err) => console.log(err));

        mkdirp(baseUrl + '/presenter')
            .then(() => {
                mkdirp(baseUrl + '/presenter/controllers')
                mkdirp(baseUrl + '/presenter/usecases')
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