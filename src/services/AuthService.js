import { Log, User, UserManager } from 'oidc-client'

export default function AuthService() {
  const settings = {
    authority: process.env.REACT_APP_STS_AUTHORITY,
    client_id: process.env.REACT_APP_CLIENT_ID,
    redirect_uri: window.location.origin + '/signin-callback.html',
    silent_redirect_uri: window.location.origin + '/silent-renew.html',
    post_logout_redirect_uri: window.location.origin,
    response_type: process.env.REACT_APP_RESPONSE_TYPE,
    scope: process.env.REACT_APP_CLIENT_SCOPE,
  }

  let userManager = new UserManager(settings)

  Log.logger = console
  Log.level = Log.INFO
}

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
