const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function generateConstructor(uri) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // Nenhum editor ativo
    }

    const text = editor.document.getText();
    const className = getClassName(text);
    const fields = getClassFields(text);

    if (className && fields.length > 0) {
        const constructor = generateConstructorText(className, fields);
        insertText(constructor);
    } else {
        vscode.window.showInformationMessage('Nenhuma classe Dart válida encontrada');
    }
   
}

function findInsertPosition(text) {
    const lines = text.split('\n');
    let lastPropertyLineIndex = null;

    for (let i = 0; i < lines.length; i++) {
        if (isPropertyDeclaration(lines[i])) {
            lastPropertyLineIndex = i;
        }
    }

    if (lastPropertyLineIndex !== null) {
        return new vscode.Position(lastPropertyLineIndex + 1, 0);
    }

    return null;
}

function isPropertyDeclaration(line) {
    // Esta regex busca por linhas que parecem ser declarações de propriedades em Dart
    return line.trim().match(/^\s*(final|const)?\s*([\w<>\?]+)\s+(\w+)\s*;/gm);
}


function getClassFields(text) {
    const fieldRegex = /^\s*(final|const)?\s*([\w<>\?]+)\s+(\w+)\s*;/gm;

    let match;
    const fields = [];

    while ((match = fieldRegex.exec(text)) !== null) {
        fields.push({ type: match[2], name: match[3] });
    }

    return fields;
}

/**
 * Encontra o nome da classe no texto
 */
function getClassName(text) {
    const classRegex = /class\s+([a-zA-Z0-9_]+)\s+/;
    const match = classRegex.exec(text);
    return match ? match[1] : null;
}


/**
 * Gera o método copyWith
 */
function generateConstructorText(className, fields) {

    const requireds = [];
    const normals = [];

    fields.forEach(field => {
        if(field.type.endsWith('?')) {
            normals.push(`this.${field.name}`)
        }else{
            requireds.push(`required this.${field.name}`);
        }
    });
    
    let parameters = requireds.join(', ')
    parameters += parameters == '' ? `${normals.join(', ')}` : `, ${normals.join(', ')}`
    return `
    ${className}({${parameters},});
`;
}

/**
 * Insere o texto no editor
 */
async function insertText(text) {
    const editor = vscode.window.activeTextEditor;
    const textEditor = editor.document.getText();
    const insertPosition = findInsertPosition(textEditor);

    if (editor) {
        await editor.edit(editBuilder => {
            editBuilder.insert(insertPosition, text);
        });
        await vscode.commands.executeCommand('editor.action.formatDocument');
    }
}

module.exports = { generateConstructor };