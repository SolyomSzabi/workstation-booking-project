import React from 'react'

const Header = () => {
  return <nav>
    <logo-img>Admin Land</logo-img>
    <navbar>
      <ul>
        <li>Buildings</li>
        <li>Users</li>
        <li>Bookings</li>
      </ul>
    </navbar>
    <button>Main Page</button>
    <button>Sign out</button>
  </nav>
}

export default Header