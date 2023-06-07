const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');
const { default: axios } = require('axios');

async function importGist(uri) {
    let editor = vscode.window.activeTextEditor;
    const textFile = editor.document.getText();

    const gistId = await promptForFeatureName("Gist ID", "bff92c45073837310f630527100462ca");

    if (gistId !== null && gistId !== "") {
        const mainFile = await readGistFile(gistId);
        editor.edit(editBuilder => {
            const currentPosition = editor.selection.active;

            editBuilder.insert(currentPosition, `${mainFile}`);
        })
        
    }

//     const indexStart = textFile.lastIndexOf('abstract class ');
//     let indexEnd = textFile.indexOf(' {');

//     if (indexEnd === -1) {
//         indexEnd = textFile.indexOf('{');
//     }

//     if (indexEnd === -1) {
//         vscode.window.showErrorMessage('please format the code before running the implements interface');
//         return;
//     }

//     if (textFile.includes('extends')) {
//         indexEnd = textFile.indexOf(' extends');
//     } else if (textFile.includes('with')) {
//         indexEnd = textFile.indexOf(' with');
//     }

//     let interfaceName = textFile.substring(indexStart, indexEnd).replace('abstract class', '').replace(' {', '');
//     interfaceName = interfaceName.trimEnd();
//     const configType = vscode.workspace.getConfiguration("generate").get("template.type");
//     let implementationName = interfaceName.trim();
//     if (configType === 'I Prefix') {
//         implementationName = interfaceName.replace('I', '');
//     } else if (configType === 'Clean Code') {
//         implementationName = interfaceName + 'Impl';
//     } else {
//         let suffixClass = await promptForFeatureName();
//         if (suffixClass == undefined) {
//             return;
//         } else if (suffixClass === '') {
//             suffixClass = 'Impl';
//         }
//         implementationName = interfaceName + suffixClass;
//     }

//     let wsedit = new vscode.WorkspaceEdit();
//     const basePath = editor.document.uri.fsPath.replace(`${_.snakeCase(interfaceName)}.dart`, '');
//     if (basePath) {
//         const path = `${basePath}/${_.snakeCase(implementationName)}.dart`;
//         const filePath = vscode.Uri.file(path);
//         wsedit.createFile(filePath);
//         vscode.workspace.applyEdit(wsedit);
//         fs.writeFileSync(path, `import './${_.snakeCase(interfaceName)}.dart';

// class${implementationName} implements${interfaceName} {

// }`, 'utf8');

//         vscode.workspace.openTextDocument(path).then(async doc => {
//             vscode.window.showTextDocument(doc);
//         });

//     }
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