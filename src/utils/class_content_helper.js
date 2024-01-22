const vscode = require('vscode');

function isCursorOnClassDeclaration() {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    const lineText = editor.document.lineAt(position.line).text;

    return /^\s*(final\s+)?class\s+\w+/.test(lineText);

}

function isCursorOnAttributeDeclaration() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return false; // Nenhum editor ativo
    }

    const position = editor.selection.active;
    const lineText = editor.document.lineAt(position.line).text;

    // A expressão regular para identificar declarações de atributos
    const attributeRegex = /^\s*(final\s+)?[\w?<>[\]]+\s+\w+(\s*=\s*[^;]+;|;)/;

    return attributeRegex.test(lineText);
}

function findClassContentAtPosition(text, position) {
    const lines = text.split('\n');
    let classDeclarationLine = -1;

    // Encontrar a linha onde a declaração da classe começa
    for (let i = 0; i <= position.line; i++) {
        if (lines[i].includes('class ')) {
            classDeclarationLine = i;
            break;
        }
    }

    if (classDeclarationLine === -1) {
        return null; // Nenhuma declaração de classe encontrada
    }

    // Extrair o conteúdo da classe
    let braceCount = 0;
    let classContent = '';
    for (let i = classDeclarationLine; i < lines.length; i++) {
        if (lines[i].includes('{')) {
            braceCount++;
        }
        if (braceCount > 0) {
            classContent += lines[i] + '\n';
        }
        if (lines[i].includes('}')) {
            braceCount--;
            if (braceCount === 0) {
                break; // Fim da classe
            }
        }
    }

    return classContent;
}
module.exports = { findClassContentAtPosition, isCursorOnClassDeclaration, isCursorOnAttributeDeclaration };