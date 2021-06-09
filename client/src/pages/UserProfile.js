import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const UserProfile = () => {
  const { user } = useContext(AuthContext)

  useEffect(() => {
    console.log('user', user)
  })
  return(
    <div className='user-profile'>
      <h1 className='user-profile-header'>User Profile</h1>
      {user &&
        <div>
          <h3>
            Name: {user.name}
          </h3>
          <h3>
            Email: {user.email}
          </h3>
        </div>
      }
    </div>
  )
}

export default UserProfile