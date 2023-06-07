const fs = require('fs');
const vscode = require('vscode');
function getContentTemplate(templatePath) {
    const baseExtensionPath = vscode.extensions.getExtension('RodrigoRahman.flutter-dart-utils').extensionPath;
    const finalTemplatePath = `${baseExtensionPath}/src/commands/templates/${templatePath}`;
    
    return fs.readFileSync(finalTemplatePath, 'utf8');
}

module.exports = { getContentTemplate };