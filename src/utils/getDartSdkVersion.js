const yaml = require('js-yaml');
const path = require('path');
const semver = require('semver');
const vscode = require('vscode');
const fs = require('fs');
const semverMajor = require('semver/functions/major');
const { forEach } = require('lodash');


let dartSDK = null;
let _isDart3 = null;

function getRootPath() {
    return vscode.workspace.workspaceFolders[0].uri.fsPath;
}

function getDartSDKVersion(context) {
    return dartSDK ?? readDartSDK(context)
}

function readDartSDK(context) {
    const pubspecPath = path.join(getRootPath(), 'pubspec.yaml');

    const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');

    const pubspec = yaml.load(pubspecContent);

    // Obtém a versão do SDK Dart
    dartSDK = pubspec['environment'].sdk;
    return dartSDK;

}

function isDart3() {

    if (_isDart3 != null) {
        return _isDart3;
    }

    const dartSDK = getDartSDKVersion();
    const versions = dartSDK.split(' ');
    for (let version in versions) {
        _isDart3 = semver.gt(semver.coerce(versions[version]), '3.0.0');
        if (!_isDart3) {
            _isDart3 = false;
            break;
        }
    }
    return _isDart3;
}

function isDart(versionCheck) {

    const dartSDK = getDartSDKVersion();
    const versions = dartSDK.split(' ');
    for (let version in versions) {
        _isDart3 = semver.gt(semver.coerce(versions[version]), versionCheck);
        if (!_isDart3) {
            _isDart3 = false;
            break;
        }
    }
    return _isDart3;
}


module.exports = { isDart3, isDart };