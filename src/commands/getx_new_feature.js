const vscode = require('vscode');
const mkdirp = require('mkdirp');
const fs = require('fs');
const _ = require('lodash');
// const { wrapWithProviderConsumerBuilder, wrapWithValueListenableBuilder, wrapWithMobXObserverBuilder } = require('../commands/wrap-with');
const { createFile } = require('../commands/create_file');

async function getXNewFeature(uri) {
    const featureName = await promptForFeatureName("Feature GetX Name");
    if (featureName) {
        mkdirp(uri.fsPath + '/' + featureName);
        const baseUrl = uri.fsPath + '/' + featureName
        const page = `${baseUrl}/${featureName}_page.dart`;
        const bindings = `${baseUrl}/${featureName}_bindings.dart`;
        const controller = `${baseUrl}/${featureName}_controller.dart`;

        await createFile(page);
        await createFile(bindings);
        await createFile(controller);

        const pageNameFile = _.upperFirst(_.camelCase(`${featureName}Page`));
        const bindingNameFile = _.upperFirst(_.camelCase(`${featureName}Bindings`));
        const controllerNameFile = _.upperFirst(_.camelCase(`${featureName}Controller`));

        fs.writeFileSync(page, `import 'package:get/get.dart';
import 'package:flutter/material.dart';
import './${featureName}_controller.dart';

class ${pageNameFile} extends GetView<${controllerNameFile}> {
@override
Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('${pageNameFile}'),),
        body: Container(),
    );
}
}`, 'utf8');

        fs.writeFileSync(bindings, `import 'package:get/get.dart';
import './${featureName}_controller.dart';

class ${bindingNameFile} implements Bindings {
@override
void dependencies() {
    Get.put(${controllerNameFile}());
}
}`, 'utf8');

        fs.writeFileSync(controller, `import 'package:get/get.dart';

class ${controllerNameFile} extends GetxController {}`, 'utf8');

        vscode.window.showInformationMessage('GetX new feature created');
    }
}

function promptForFeatureName(prompt) {
	const FeatureNamePromptOptions = {
		prompt: prompt,
		placeHolder: "Feature Name"
	};
	return vscode.window.showInputBox(FeatureNamePromptOptions);
}



// vscode.commands.registerCommand("extension.getxfeature", async function (uri) {
//     const featureName = await promptForFeatureName("Feature GetX Name");
//     if (featureName) {
//         mkdirp(uri.fsPath + '/' + featureName);
//         const baseUrl = uri.fsPath + '/' + featureName
//         const page = `${baseUrl}/${featureName}_page.dart`;
//         const bindings = `${baseUrl}/${featureName}_bindings.dart`;
//         const controller = `${baseUrl}/${featureName}_controller.dart`;

//         await createFile(page);
//         await createFile(bindings);
//         await createFile(controller);

//         const pageNameFile = _.upperFirst(_.camelCase(`${featureName}Page`));
//         const bindingNameFile = _.upperFirst(_.camelCase(`${featureName}Bindings`));
//         const controllerNameFile = _.upperFirst(_.camelCase(`${featureName}Controller`));

//         fs.writeFileSync(page, `import 'package:get/get.dart';
// import 'package:flutter/material.dart';
// import './${featureName}_controller.dart';

// class ${pageNameFile} extends GetView<${controllerNameFile}> {
// @override
// Widget build(BuildContext context) {
//     return Scaffold(
//         appBar: AppBar(title: Text('${pageNameFile}'),),
//         body: Container(),
//     );
// }
// }`, 'utf8');

//         fs.writeFileSync(bindings, `import 'package:get/get.dart';
// import './${featureName}_controller.dart';

// class ${bindingNameFile} implements Bindings {
// @override
// void dependencies() {
//     Get.put(${controllerNameFile}());
// }
// }`, 'utf8');

//         fs.writeFileSync(controller, `import 'package:get/get.dart';

// class ${controllerNameFile} extends GetxController {}`, 'utf8');

//         vscode.window.showInformationMessage('GetX new feature created');
//     }
// });

module.exports = {getXNewFeature};