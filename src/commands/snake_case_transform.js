const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');
const { getContentTemplate } = require('./templates/read_file_template');
const pathImp = require('path');

async function snakeCaseTransform(uri) {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const selection = editor.selection;

        const text = document.getText(selection);

        const replacedText = text.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

        editor.edit(editBuilder => {
            editBuilder.replace(selection, replacedText);
        });
    }
}



module.exports = { snakeCaseTransform };