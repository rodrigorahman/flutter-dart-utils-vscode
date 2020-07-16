const vscode = require('vscode');
const mkdirp = require('mkdirp');

async function run(uri) {
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

}

function promptForFeatureName() {
	const FeatureNamePromptOptions = {
		prompt: "Feature Clean Architecture Name",
		placeHolder: "Feature Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}
