import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BASE_URL from '../utils/constant'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice'


const NavBar = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async ()=>{
  await axios.post(BASE_URL+"/logout",{},{withCredentials:true});
  dispatch(removeUser());
  return navigate("/login");
  }

  const user = useSelector((store)=>store.user);
  // const {photoUrl,firstName} = user;
    return (
    <div>
      <div>
      <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/feed" className="btn btn-ghost  text-xs lg:text-xl">DevTinder😎</Link>
  </div>
  <div className="flex mx-3 lg:mx-14 gap-4 lg:gap-10">
  {
    user&&
    <p className='lg:pt-2 pt-3 text-xs lg:text-xl'>Welcome {user.firstName}</p>
  }
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        {/* <p>Welcome!!!{firstName} </p> */}
        {user &&
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
           src={user.photoUrl}
            />
        </div>
        }
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link to="/connections" >Connections</Link></li>
        <li><Link to="/request">Request</Link> </li>
        <li><Link to="/login" onClick={handleLogout}>Logout </Link></li>
      </ul>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default NavBar
