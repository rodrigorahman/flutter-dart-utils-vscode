const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const { createFile } = require('../commands/create_file');

async function modularInitialConfig(uri) {

    const basePathName = await promptForFeatureName("Specify the base folder of your project (app, src, or /). Leave it blank to add it to the src folder.", "src") || 'src';
    const basePath = uri.fsPath;

    mkdirp(`${basePath}/${basePathName}/modules/home/`);

    const mainDartFile = `${basePath}/main.dart`;
    const appModuleDartFile = `${basePath}/${basePathName}/app_module.dart`;
    const appWidgetDartFile = `${basePath}/${basePathName}/app_widget.dart`;
    const homePageDartFile = `${basePath}/${basePathName}/modules/home/home_page.dart`;

    await createFile(mainDartFile);
    await createFile(appModuleDartFile);
    await createFile(appWidgetDartFile);
    await createFile(homePageDartFile);


    const baseExtensionPath = vscode.extensions.getExtension('RodrigoRahman.flutter-dart-utils').extensionPath;
    const basePathTemplate = `${baseExtensionPath}/src/commands/templates/modular`;
    
    createFileByTemplate(`${basePathTemplate}/main.template`, mainDartFile, basePathName);
    createFileByTemplate(`${basePathTemplate}/app_module.template`, appModuleDartFile, basePathName);
    createFileByTemplate(`${basePathTemplate}/app_widget.template`, appWidgetDartFile, basePathName);
    createFileByTemplate(`${basePathTemplate}/home_page.template`, homePageDartFile, basePathName);
    

    //     const featureName = await promptForFeatureName("Modular Feature Name");
    //     if (featureName) {
    //         mkdirp(uri.fsPath + '/' + featureName);
    //         const baseUrl = uri.fsPath + '/' + featureName
    //         const page = `${baseUrl}/${featureName}_page.dart`;
    //         const modularModule = `${baseUrl}/${featureName}_module.dart`;
    //         const controller = `${baseUrl}/${featureName}_controller.dart`;

    //         await createFile(page);
    //         await createFile(modularModule);
    //         await createFile(controller);

    //         const pageNameFile = _.upperFirst(_.camelCase(`${featureName}Page`));
    //         const moduleNameFile = _.upperFirst(_.camelCase(`${featureName}Module`));
    //         const controllerNameFile = _.upperFirst(_.camelCase(`${featureName}Controller`));

    //         fs.writeFileSync(page, `import 'package:flutter/material.dart';
    // import './${featureName}_controller.dart';

    // class ${pageNameFile} extends StatelessWidget {

    //     final ${controllerNameFile} _controller;

    //     const ${pageNameFile}({ 
    //         Key? key,
    //         required ${controllerNameFile} controller,
    //       }) : _controller = controller;

    //     @override
    //     Widget build(BuildContext context) {
    //         return Scaffold(
    //             appBar: AppBar(title: Text('${pageNameFile}'),),
    //             body: Container(),
    //         );
    //     }
    // }`, 'utf8');

    //         fs.writeFileSync(modularModule, `import 'package:flutter_modular/flutter_modular.dart';
    // import './${featureName}_controller.dart';
    // import './${featureName}_page.dart';

    // class ${moduleNameFile} extends Module {
    //     @override
    //     final List<Bind> binds = [
    //       Bind.lazySingleton((i) => ${controllerNameFile}()),
    //     ];

    //     @override
    //     final List<ModularRoute> routes = [
    //       ChildRoute('/', child: (_, args) => ${pageNameFile}(controller: Modular.get())),
    //     ];

    // }`, 'utf8');

    //         fs.writeFileSync(controller, `import 'package:mobx/mobx.dart';

    // part '${featureName}_controller.g.dart';

    // class ${controllerNameFile} = _${controllerNameFile}Base with _$${controllerNameFile};

    // abstract class _${controllerNameFile}Base with Store {

    // }

    // `, 'utf8');

    //         vscode.window.showInformationMessage('Modular new feature created');
    //     }
}

function promptForFeatureName(prompt, placeHolder = 'Feature Name') {
    const FeatureNamePromptOptions = {
        prompt: prompt,
        placeHolder: placeHolder
    };
    return vscode.window.showInputBox(FeatureNamePromptOptions);
}

function createFileByTemplate(templatePath, filePath, basePath) {
    fs.readFile(templatePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        }
        
        const bodyFile = data.replace(/##BASE_PATH##/g, basePath);
        fs.writeFile(filePath, bodyFile, { flag: 'w' }, (err) => {
            if (err) throw err;
            console.log('Arquivo salvo com sucesso!');
        });
    });
}

module.exports = { modularInitialConfig };