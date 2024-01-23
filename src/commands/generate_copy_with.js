const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');
const { findClassContentAtPosition } = require('../utils/class_content_helper');

async function generateCopyWith(uri) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('Nenhum arquivo aberto');
        return;
    }

    const cursorPosition = editor.selection.start;
    const text = findClassContentAtPosition(editor.document.getText(), cursorPosition);
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

function getClassFields(text) {
    // const fieldRegex = /^\s*(final|const|var)?\s*([\w<>,\?\s]+)?\s+(\w+)(\s*=\s*[^;]+;|;)/gm;
    const fieldRegex = /^\s*(?!.*\b(get|set)\b)(final|const|var)?\s*([\w<>,\?\s]+)?\s+(\w+)\s*;\s*$/gm;

    let match;
    const fields = [];

    while ((match = fieldRegex.exec(text)) !== null) {
        let type = '';

        if (!match[3] || (match[3] == 'final' || match[3] == 'const' || match[3] == 'var')) {
            type = 'dynamic';
        } else {
            type = match[3].trim();
        }

        const name = match[4].trim();
        fields.push({ type: type, name: name });
    }



    return fields;
}


/**
 * Gera o método copyWith
 */
function generateCopyWithMethod(className, fields) {
    const parameters = fields.map(field => {
        if (field.type.endsWith('?')) {
            return `ValueGetter<${field.type}>? ${field.name}`
        } else {
            return `${field.type}? ${field.name}`
        }

    }).join(', ');
    const assignments = fields.map(field => {
        if (field.type.endsWith('?')) {
            return `${field.name}: ${field.name} != null ? ${field.name}() : this.${field.name}`
        } else {
            return `${field.name}: ${field.name} ?? this.${field.name}`
        }

    }).join(',\n    ');

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
async function insertText(text) {
    const editor = vscode.window.activeTextEditor;
    const textEditor = editor.document.getText();
    const insertPosition = findPositionBeforeClosingBrace(textEditor);

    if (editor) {
        await editor.edit(editBuilder => {
            editBuilder.insert(insertPosition, text);

            if (text.includes('ValueGetter') && !text.includes("import 'package:flutter/material.dart';")) {
                editBuilder.insert(new vscode.Position(0, 0), `
                    import 'package:flutter/material.dart';\n
                `);
            }


        });
        await vscode.commands.executeCommand('editor.action.formatDocument');

    }
}

module.exports = { generateCopyWith };