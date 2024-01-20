const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');
const { getContentTemplate } = require('./templates/read_file_template');

async function jsonSerializableGenerateJsonKey(uri) {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const selection = editor.selection;
        const position = editor.selection.active;
        const line = selection.start.line;
        const lineText = editor.document.lineAt(position.line);
        var text = lineText.text;
        // text = text.replace('final', '');
        // text = text.replace('var', '');
        const range = /(.*?)(?:\s*=|\s*;)/.exec(text.trim());

        if (range) {
            // const text = document.getText(range);
            const match = range[1].split(' ');
            if (match) {
                if(match.length >= 3){
                    match.shift();
                }
                const name = match[match.length == 1 ? 0 : 1].replace('_', '');
                const replacedText = name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();

                editor.edit(editBuilder => {
            
                    const position = line === 0 ? 0 : line;
                    const newPosition = new vscode.Position(position, 0);
                    const textToAdd = "@JsonKey(name: '"+ replacedText + "')\n";
                    editBuilder.insert(newPosition, textToAdd);
                });
            }
        }else {
            
        }

    }
}



module.exports = { jsonSerializableGenerateJsonKey };