const vscode = require('vscode');
const { default: axios } = require('axios');

async function importGist(uri) {
    let editor = vscode.window.activeTextEditor;

    const gistId = await promptForFeatureName("Gist ID", "bff92c45073837310f630527100462ca");

    if (gistId !== null && gistId !== "") {
        const mainFile = await readGistFile(gistId);
        editor.edit(editBuilder => {
            const currentPosition = editor.selection.active;

            editBuilder.insert(currentPosition, `${mainFile}`);
        })
        
    }

}

async function readGistFile(gistId) {
    try {
        const url = `https://api.github.com/gists/${gistId}`;
        const response = await axios.get(url);
        const gist = response.data;

        if (gist.files && gist.files['main.dart']) {
            const fileUrl = gist.files['main.dart'].raw_url;
            const fileResponse = await axios.get(fileUrl);
            return fileResponse.data;
        } else {
            vscode.window.showErrorMessage('main.dart file not found');
        }
    } catch (error) {
        console.error(error);
    }
}

function promptForFeatureName(prompt, placeHolder = '') {
    const FeatureNamePromptOptions = {
        prompt: prompt,
        placeHolder: placeHolder
    };
    return vscode.window.showInputBox(FeatureNamePromptOptions);
}



module.exports = { importGist };