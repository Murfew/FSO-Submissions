import { Link } from 'react-router-dom'

const Header = ({ user, handleLogout }) => {
  const navStyle = {
    backgroundColor: 'lightgray',
    padding: 8,
  }

  const linkStyle = {
    marginRight: 5,
  }

  const buttonStyle = {
    marginLeft: 5,
  }

  return (
    <nav style={navStyle}>
      <Link style={linkStyle} to='/'>
        blogs
      </Link>
      <Link style={linkStyle} to='/users'>
        users
      </Link>
      {user.name} logged in
      <button style={buttonStyle} onClick={() => handleLogout()}>
        logout
      </button>
    </nav>
  )
}

export default Header
