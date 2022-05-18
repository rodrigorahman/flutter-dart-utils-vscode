const vscode = require('vscode');
const fs = require('fs');
const _ = require('lodash');

async function generateStatefulWidget(uri) {
  const widgetName = await promptForFeatureName("Widget Name");
  if (!widgetName) {
    vscode.window.showInformationMessage('Creating a Statefull Widget Canceled');
    return;
  }
  let wsedit = new vscode.WorkspaceEdit();
  const path = `${uri.fsPath}/${widgetName}.dart`;
  const filePath = vscode.Uri.file(path);
  wsedit.createFile(filePath);
  vscode.workspace.applyEdit(wsedit);
  const widgetNameFile = _.upperFirst(_.camelCase(widgetName));
  fs.writeFileSync(path, `import 'package:flutter/material.dart';
    
class ${widgetNameFile} extends StatefulWidget {
  const ${widgetNameFile}({Key? key}) : super(key: key);

  @override
  _${widgetNameFile}State createState() => _${widgetNameFile}State();
}

class _${widgetNameFile}State extends State<${widgetNameFile}> {
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

module.exports = { generateStatefulWidget };