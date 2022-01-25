import React, { useState } from 'react'
import { getUser } from 'services/AuthService'
import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
// reactstrap components
import { Container } from 'reactstrap'
// core components
import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import AdminFooter from 'components/Footers/AdminFooter.js'
import Sidebar from 'components/Sidebar/Sidebar.js'

import routes from 'routes.js'

const Admin = (props) => {
  const mainContent = React.useRef(null)
  const location = useLocation()

  const [loggedInUser, setLoggedInUser] = useState(null)

  const getUserInfo = async () => {
    let res = await getUser()
    //console.log(res)
    const data = sessionStorage.getItem(
      'oidc.user:https://psl-app-vm3/NpaAuthServer/.well-known/openid-configuration:npa-invoice-ui'
    )
    let userOBJ = data
    let user = JSON.parse(userOBJ)
    console.log(user)
    // return user
    setLoggedInUser((loggedInUser) => user)
  }

  React.useEffect(() => {
    console.log('admin navbar')
    getUserInfo()
    console.log('loged in user', loggedInUser)
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContent.current.scrollTop = 0
  }, [location])

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name
      }
    }
    return 'Brand'
  }

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/admin/index',
          imgSrc: require('../assets/img/brand/npa.png').default,
          imgAlt: '...',
        }}
      />

      <div className='main-content' ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
        />
        <Switch>
          {getRoutes(routes)}
          <Redirect from='*' to='/admin/index' />
        </Switch>
        <Container fluid>
          <AdminFooter />
        </Container>
      </div>
    </>
  )
}

export default Admin
