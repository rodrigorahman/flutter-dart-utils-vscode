const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');
const { findClassContentAtPosition } = require('../utils/class_content_helper');

async function generateNamedConstructor(uri) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // Nenhum editor ativo
    }
    const cursorPosition = editor.selection.start;
    const text = findClassContentAtPosition(editor.document.getText(), cursorPosition);
    const className = getClassName(text);
    const fields = getClassFields(text);

    if (className && fields.length > 0) {
        const constructor = generateNamedConstructorText(className, fields);
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
    return line.trim().match(/^\s*(final|const|var)?\s*([\w<>,\?\s]+)?\s+(\w+)(\s*=\s*[^;]+;|;)/gm);
}


function getClassFields(text) {
    const fieldRegex = /^\s*(final|const|var)?\s*([\w<>,\?\s]+)?\s+(\w+)(\s*=\s*[^;]+;|;)/gm;

    let match;
    const fields = [];  

    while ((match = fieldRegex.exec(text)) !== null) {
        const type = match[2] ? match[2].trim() : 'dynamic';
        const name = match[3].trim();
        
        
        if(match[0].includes('final') && match[0].includes('=')){
            vscode.window.showWarningMessage(`Field ${name} is already initialized and final, cannot add to constructor`);
        }else{
            fields.push({ type: type, name: name });
        }

        
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
function generateNamedConstructorText(className, fields) {

    const requireds = [];
    const normals = [];

    fields.forEach(field => {
        if (field.type.endsWith('?')) {
            normals.push(`this.${field.name}`)
        } else {
            requireds.push(`required this.${field.name}`);
        }
    });

    let parameters = '';
    const totalRequireds = requireds.length;
    if (totalRequireds > 0) {
        parameters = requireds.join(', ')
    }

    if (normals.length > 0) {
        parameters += totalRequireds > 0 ? `, ${normals.join(', ')}` : `${normals.join(', ')}`
    }

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

module.exports = { generateNamedConstructor };