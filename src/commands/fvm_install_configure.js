const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getContentTemplate } = require('./templates/read_file_template');

async function fvmInstallConfigure(uri) {
    const fvmVersion = await promptForFeatureName('What version of flutter would you like?')
    if (fvmVersion !== '') {
        
        const task = new vscode.Task(
            { type: 'shell' },
            vscode.TaskScope.Workspace,
            `Installing Version ${fvmVersion}`,
            `fvm install ${fvmVersion}`,
            new vscode.ShellExecution(`fvm install ${fvmVersion}`)
        );

        const installTask = await vscode.tasks.executeTask(task);
        let useTask;
        vscode.tasks.onDidEndTask(async event => {
            
            if (event.execution === installTask) {
                const taskUse = new vscode.Task(
                    { type: 'shell' },
                    vscode.TaskScope.Workspace,
                    `Configure Version ${fvmVersion}`,
                    `fvm use ${fvmVersion}`,
                    new vscode.ShellExecution(`fvm use ${fvmVersion}`)
                );
                useTask = await vscode.tasks.executeTask(taskUse);
                
            } else if (event.execution === useTask) {
                const rootPath = vscode.workspace.workspaceFolders[0].uri.fsPath
                const folder = path.join(rootPath, '.vscode');
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder)
                }
                const templateSettings = getContentTemplate(path.join('fvm', 'settings.template'));
                fs.writeFileSync(path.join(folder, 'settings.json'), templateSettings, 'utf-8');
                fs.appendFileSync(path.join(rootPath, ".gitignore"), '\n\n.fvm/flutter_sdk')
            }
        });



    }

}

function promptForFeatureName(prompt, placeHolder = 'Ex: 3.0.0') {
    const FeatureNamePromptOptions = {
        prompt: prompt,
        placeHolder: placeHolder
    };
    return vscode.window.showInputBox(FeatureNamePromptOptions);
}

module.exports = { fvmInstallConfigure };