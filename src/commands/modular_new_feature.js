const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
// const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder } = require('../commands/wrap-with');
const { createFile } = require('../commands/create_file');

async function modularNewFeature(uri) {
    const featureName = await promptForFeatureName("Modular Feature Name");
    if (featureName) {
        mkdirp(uri.fsPath + '/' + featureName);
        const baseUrl = uri.fsPath + '/' + featureName
        const page = `${baseUrl}/${featureName}_page.dart`;
        const modularModule = `${baseUrl}/${featureName}_module.dart`;
        const controller = `${baseUrl}/${featureName}_controller.dart`;

        await createFile(page);
        await createFile(modularModule);
        await createFile(controller);

        const pageNameFile = _.upperFirst(_.camelCase(`${featureName}Page`));
        const moduleNameFile = _.upperFirst(_.camelCase(`${featureName}Module`));
        const controllerNameFile = _.upperFirst(_.camelCase(`${featureName}Controller`));

        fs.writeFileSync(page, `import 'package:flutter/material.dart';
import './${featureName}_controller.dart';

class ${pageNameFile} extends StatelessWidget {

    final ${controllerNameFile} _controller;

    const ${pageNameFile}({ 
        Key? key,
        required ${controllerNameFile} controller,
      }) : _controller = controller;

    @override
    Widget build(BuildContext context) {
        return Scaffold(
            appBar: AppBar(title: Text('${pageNameFile}'),),
            body: Container(),
        );
    }
}`, 'utf8');

        fs.writeFileSync(modularModule, `import 'package:flutter_modular/flutter_modular.dart';
import './${featureName}_controller.dart';
import './${featureName}_page.dart';

class ${moduleNameFile} extends Module {
    @override
    final List<Bind> binds = [
      Bind.lazySingleton((i) => ${controllerNameFile}()),
    ];
 
    @override
    final List<ModularRoute> routes = [
      ChildRoute('/', child: (_, args) => ${pageNameFile}(controller: Modular.get())),
    ];
 
}`, 'utf8');

        fs.writeFileSync(controller, `import 'package:mobx/mobx.dart';

part '${featureName}_controller.g.dart';

class ${controllerNameFile} = _${controllerNameFile}Base with _$${controllerNameFile};

abstract class _${controllerNameFile}Base with Store {
    
}

`, 'utf8');

        vscode.window.showInformationMessage('Modular new feature created');
    }
}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Feature Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}



module.exports = {modularNewFeature};