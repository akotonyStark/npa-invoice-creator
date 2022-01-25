import { login } from '../../services/AuthService'

const Login = () => {
  return (
    <>
      <div style={styles.container}>
        <div style={styles.buttonWrap} onClick={login}>
          Click to Login
        </div>
      </div>
    </>
  )
}

export default Login

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
  },
  container: {
    height: '100vh',
    background: 'rgb(37, 39, 60)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  buttonWrap: {
    width: '15%',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    height: 50,
    background: 'linear-gradient(hsl(192, 100%, 67%),hsl(280, 87%, 65%))',
  },
}
