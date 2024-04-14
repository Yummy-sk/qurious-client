import { useLayoutEffect } from 'react';

function App() {
  const vscode = acquireVsCodeApi();

  useLayoutEffect(() => {
    const handleMessages = (event: MessageEvent) => {
      const message = event.data; // The JSON data our extension sent

      switch (message.type) {
        case 'TOKEN':
          console.log('HELLO GOOD', message.value);
          break;
        default:
      }
    };

    window.addEventListener('message', handleMessages);

    return () => {
      window.removeEventListener('message', handleMessages);
    };
  }, []);

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
