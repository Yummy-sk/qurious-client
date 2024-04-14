interface VsCodeApi {
  postMessage(msg: Record<string, unknown>): void;
  setState(state: Record<string, unknown>): void;
  getState(): unknown;
}

declare function acquireVsCodeApi(): VsCodeApi;
