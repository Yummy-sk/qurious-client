interface vscode {
  postMessage(message: any): void;
}
// declare function acquireVsCodeApi(): vscode;
declare const vscode: vscode;

function App() {
  // @ts-ignore
  const vscode = acquireVsCodeApi();
  return (
    <div className="bg-red-500 w-full h-full">
      <h1>My App</h1>
      <p>Here is my app fddd</p>
      <button
        onClick={() => {
          vscode.postMessage({ type: 'LOGIN', value: 'Hello VSCode!' });
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
