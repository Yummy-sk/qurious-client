import * as vscode from 'vscode';

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Listen for messages from the Sidebar component and execute action
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'LOGIN': {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.value);
          break;
        }
        case 'onError': {
          if (!data.value) {
            return;
          }
          vscode.window.showErrorMessage(data.value);
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    let scriptSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'web', 'dist', 'index.js')
    );

    let cssSrc = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'web', 'dist', 'index.css')
    );

    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
    		<link rel="stylesheet" href="${cssSrc}" />
      </head>
      <body>
        <div id="root"></div>
    		<script src="${scriptSrc}"></script>
      </body>
    </html>
    `;
  }
}
