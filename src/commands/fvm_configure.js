const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { getContentTemplate } = require('./templates/read_file_template');

async function fvmConfigure(uri) {
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
                const folder = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, '.vscode');
                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder)
                }
                const templateSettings = getContentTemplate(path.join('fvm', 'settings.template'));
                fs.writeFileSync(path.join(folder, 'settings.json'), templateSettings, 'utf-8');
            }
        });



    }

}

function promptForFeatureName(prompt, placeHolder = 'Feature Name') {
    const FeatureNamePromptOptions = {
        prompt: prompt,
        placeHolder: placeHolder
    };
    return vscode.window.showInputBox(FeatureNamePromptOptions);
}

module.exports = { fvmConfigure };