const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function generateStatelessWidget(uri) {
    const widgetName = await promptForFeatureName("Widget Name");
    let wsedit = new vscode.WorkspaceEdit();
    const path = `${uri.fsPath}/${widgetName}.dart`;
    const filePath = vscode.Uri.file(path);
    wsedit.createFile(filePath);
    vscode.workspace.applyEdit(wsedit);
    const widgetNameFile = _.upperFirst(_.camelCase(widgetName));
    fs.writeFileSync(path, `import 'package:flutter/material.dart';
    
class ${widgetNameFile} extends StatelessWidget {

  const ${widgetNameFile}({ Key? key }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(''),
      ),
      body: Container(),
    );
  }
}`, 'utf8');
    vscode.workspace.openTextDocument(path).then(doc => {
        vscode.window.showTextDocument(doc);
    });
    vscode.window.showInformationMessage('Created a StatelessWidget');
}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Widget Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}

module.exports = {generateStatelessWidget};