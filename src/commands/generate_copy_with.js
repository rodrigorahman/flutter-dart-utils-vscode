const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function generateCopyWith(uri) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('Nenhum arquivo aberto');
        return;
    }

    const text = editor.document.getText();
    const className = getClassName(text);
    const fields = getClassFields(text);

    if (className && fields.length > 0) {
        const copyWithMethod = generateCopyWithMethod(className, fields);
        insertText(copyWithMethod);
    } else {
        vscode.window.showInformationMessage('Nenhuma classe Dart válida encontrada');
    }
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
 * Encontra os campos da classe no texto
 */
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
 * Gera o método copyWith
 */
function generateCopyWithMethod(className, fields) {
    const parameters = fields.map(field => {
        if (field.type.endsWith('?')) {
            return `${field.type} ${field.name}`
        } else {
            return `${field.type}? ${field.name}`
        }

    }).join(', ');
    const assignments = fields.map(field => `${field.name}: ${field.name} ?? this.${field.name}`).join(',\n    ');

    return `
    ${className} copyWith({${parameters},}) {
      return ${className}(
        ${assignments},
      );
    }
`;
}

function findPositionBeforeClosingBrace(text) {
    const lines = text.split('\n');
    let lastBraceIndex = null;

    for (let i = lines.length - 1; i >= 0; i--) {
        if (lines[i].trim() === '}') {
            lastBraceIndex = i;
            break;
        }
    }

    if (lastBraceIndex !== null) {
        return new vscode.Position(lastBraceIndex, 0);
    }

    return null;
}
/**
 * Insere o texto no editor
 */
function insertText(text) {
    const editor = vscode.window.activeTextEditor;
    const textEditor = editor.document.getText();
    const insertPosition = findPositionBeforeClosingBrace(textEditor);

    if (editor) {
        editor.edit(editBuilder => {
            editBuilder.insert(insertPosition, text);
        });
    }
}

module.exports = { generateCopyWith };