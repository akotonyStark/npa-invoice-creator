import { Log, User, UserManager } from 'oidc-client'

const config = {
  // the URL of our identity server
  authority: process.env.REACT_APP_AUTHORITY,
  // this ID maps to the client ID in the identity client configuration
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_root: process.env.REACT_APP_CLIENT_ROOT_PSL,
  apiRoot: 'https://demo.identityserver.io/api/',
  // URL to redirect to after login
  redirect_uri: REACT_APP_REDIRECT_URI_PSL,
  //redirect_uri: process.env.REACT_APP_redirect_uri,
  // URL to redirect to after logout
  post_logout_redirect_uri: process.env.REACT_APP_post_logout_redirect_uri_PSL,
  //post_logout_redirect_uri: process.env.REACT_APP_post_logout_redirect_uri_,
  response_type: 'code',
  // the scopes or resources we would like access to
  scope: process.env.REACT_APP_scope,
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
