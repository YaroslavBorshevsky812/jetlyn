import { useState } from "react"

const User = ({user}) => {
const [userInfo, setUserInfo] = useState(false)
const userClasses = ['user']
if(userInfo) {
    userClasses.push(['active'])
}
    return (
      <div onClick={() => setUserInfo(!userInfo)} className={userClasses.join(' ')}>
          <div className="user_name">
              {user.firstName}&nbsp;{user.lastName}
            </div>
          <div className="user_message">{user.message}</div>
          <div className="user_info">
            <div className="user_info_timestamp">{user.timestamp}</div>
            <div className="user_info_phone">Phone:&nbsp;{user.phone}</div>
            <div className="user_info_email">Mail:&nbsp;{user.email}</div>
          </div>
          
      </div>
    )
}

export default User