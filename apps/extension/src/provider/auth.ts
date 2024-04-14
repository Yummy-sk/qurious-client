import {
  authentication,
  AuthenticationProvider,
  AuthenticationProviderAuthenticationSessionsChangeEvent,
  AuthenticationSession,
  Disposable,
  EventEmitter,
  ExtensionContext,
  ProgressLocation,
  window,
  env,
  Uri,
} from 'vscode';

export const AUTH_TYPE = `auth0`;
const AUTH_NAME = `Auth0`;
const CLIENT_ID = `Iv1.dbc970eb37f92943`;
const AUTH0_DOMAIN = `https://accounts.google.com/o/oauth2/auth`;
const SESSIONS_SECRET_KEY = `${AUTH_TYPE}.sessions`;
const REDIRECT_URI =
  'https://api.respal.me/oauth/web-dev/login/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

export class AuthProvider
  implements AuthenticationProvider, Disposable
{
  private _sessionChangeEmitter =
    new EventEmitter<AuthenticationProviderAuthenticationSessionsChangeEvent>();
  private _disposable: Disposable;

  constructor(private readonly context: ExtensionContext) {
    this._disposable = Disposable.from(
      authentication.registerAuthenticationProvider(
        AUTH_TYPE,
        AUTH_NAME,
        this,
        { supportsMultipleAccounts: false }
      )
    );
  }

  get redirectUri() {
    const publisher = this.context.extension.packageJSON.publisher;
    const name = this.context.extension.packageJSON.name;
    return `${env.uriScheme}://${publisher}.${name}`;
  }

  get onDidChangeSessions() {
    return this._sessionChangeEmitter.event;
  }

  /**
   * Get the existing sessions
   * @param scopes
   * @returns
   */
  public async getSessions(
    scopes?: string[]
  ): Promise<readonly AuthenticationSession[]> {
    return [];
  }

  /**
   * Create a new auth session
   * @param scopes
   * @returns
   */
  public async createSession(scopes: string[]): Promise<AuthenticationSession> {
    try {
      return null as any as AuthenticationSession;
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '';

      window.showErrorMessage(`Failed to create session: ${errorMessage}`);
      throw e;
    }
  }

  private async login(scopes: Array<string>) {
    return await window.withProgress(
      {
        location: ProgressLocation.Notification,
        title: 'Signing in to Auth0...',
        cancellable: true,
      },
      async (_, token) => {
        const uri = Uri.parse(
          `${AUTH0_DOMAIN}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
        );

        await env.openExternal(uri);
        return null;
      }
    );
  }

  /**
   * Remove an existing session
   * @param sessionId
   */
  public async removeSession(sessionId: string): Promise<void> {}

  /**
   * Dispose the registered services
   */
  public async dispose() {
    this._disposable.dispose();
  }
}
