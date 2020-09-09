// import { window, commands, SnippetString } from "vscode";
const { window, commands, SnippetString } = require('vscode');
const getSelectedText = require('./get-selected-text');

const wrapWith = async (snippet) => {
  let editor = window.activeTextEditor;
  if (!editor) return;
  const selection = getSelectedText(editor);
  const widget = editor.document.getText(selection);
  editor.insertSnippet(new SnippetString(snippet(widget)), selection);
  await commands.executeCommand("editor.action.formatDocument");
};


module.exports = wrapWith;