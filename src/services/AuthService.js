import { Log, User, UserManager } from 'oidc-client'

const config = {
  // the URL of our identity server
  authority:
    'https://psl-app-vm3/NpaAuthServer/.well-known/openid-configuration',
  // this ID maps to the client ID in the identity client configuration
  client_id: 'npa-invoice-ui',
  client_root: 'http://localhost:3000',
  apiRoot: 'https://demo.identityserver.io/api/',
  // URL to redirect to after login
  //redirect_uri: 'http://localhost:3000/signin-oidc',
  redirect_uri:
    'http://localhost:3000/npa-invoice-creator/signin-callback.html',
  // URL to redirect to after logout
  post_logout_redirect_uri:
    'http://localhost:3000/npa-invoice-creator/silent-renew.html',
  response_type: 'code',
  // the scopes or resources we would like access to
  scope: 'npa_invoice_api openid email profile npa_profile',
  pkce: true,
  monitorSession: false,
}

const userManager = new UserManager(config)
Log.logger = console
Log.level = Log.INFO

const getUser = async () => {
  return userManager.getUser()
}
const login = async () => {
  return userManager.signinRedirect()
}

const renewToken = async () => {
  return userManager.signinSilent()
}

const logout = async () => {
  return userManager.signoutRedirect()
}

export { getUser, login, renewToken, logout }
