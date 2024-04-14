import * as vscode from 'vscode';
import { SidebarProvider } from './provider/sidebar';
import { AuthProvider } from './provider/auth';

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const authProvider = new AuthProvider(context);

  let view = vscode.window.registerWebviewViewProvider(
    'qurious-sidebar',
    sidebarProvider,
  );

  context.subscriptions.push(view);
  context.subscriptions.push(authProvider);
}
