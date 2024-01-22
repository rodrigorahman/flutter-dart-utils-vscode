const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function createGetter(uri) {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        const document = editor.document;
        const position = editor.selection.active;

        // Expressão regular para extrair tipo e nome do atributo
        const lineText = editor.document.lineAt(position.line);

        if (lineText) {
            const text = lineText.text;
            const match = /(.*?)(?:\s*=|\s*;)/.exec(text.trim());

            if (match) {
                var str = match[0];

                // var data = str.split(" ");
                // const type = data[0];
                // const name = data[1];
                // var getterCode = `\n${type} get ${name.replace(/^_/, "")} => ${name};\n`;
                var getterCode = '';
                if(str.startsWith('final') || str.startsWith('var')){
                    
                    if(str.startsWith('final') || str.startsWith('var')){
                        str = str.replace('final', '');
                        str = str.replace('var', '');
                        str = str.trim();
                    }
                    var data = str.split(" ");
                    var type = data[0];
                    var name = data[1].replace('\;', '');

                    if(name == '=') {
                        name = type;
                        type = await vscode.window.showInputBox({prompt: "unidentified type, please enter the type" });
                        
                    }
                    getterCode = `\n${type} get ${name.replace(/^_/, "")} => ${name};\n`;
                }else if(str.endsWith(";")) {
                    var data = str.split(" ");
                    if(data.length <2){
                        vscode.window.showErrorMessage('invalid attribute');
                        return;

                    }
                    const type = data[0];
                    const name = data[1].replace('\;', '');
                    getterCode = `\n${type} get ${name.replace(/^_/, "")} => ${name};\n`;
                }else{ 
                    var data = str.split(" ");
                    const type = data[0];
                    const name = data[1].replace('\;', '');
                    getterCode = `\n${type} get ${name.replace(/^_/, "")} => ${name};\n`;
                }

                // const type = match[0];
                // const name = match[1];
                // const getterCode = `\n${type} get ${name.replace(/^_/, "")} => ${name};\n`;

                await editor.edit(editBuilder => {
                    editBuilder.insert(lineText.range.end, getterCode);
                });
                await vscode.commands.executeCommand('editor.action.formatDocument');
            }
        }
    }
}



module.exports = { createGetter };