import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'
import Card from './Card';

const Profile = () => {
   
  const preData = useSelector((store)=>store.user);
  return (
    
    <div className=''>
    { preData&&
      <EditProfile data={preData} />
    }
    </div>
  )
}

export default Profile
