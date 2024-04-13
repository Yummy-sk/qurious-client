import * as vscode from 'vscode';
import { SidebarProvider } from './provider/sidebar';

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  let view = vscode.window.registerWebviewViewProvider(
    'qurious-sidebar',
    sidebarProvider,
  );

  context.subscriptions.push(view);
}
