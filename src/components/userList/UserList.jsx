import User from "../user/User"
import React, { useRef, useState } from 'react'


 
const UserList = ({users, loaded}) => {
    const userListBtnClasses = ["userList_btn"]
    const [isBtnActive, setIsBtnActive] = useState(true)
    const container = useRef()

    const scrollBtnHendler = () => {
        if (loaded) {
            container.current.scrollTo({top: container.current.lastElementChild.offsetTop, behavior: 'smooth'})
            console.log(container)
        }
    }

    const activeBtnHendler = () => {
        if(loaded) {
                setIsBtnActive(true)
            if((container.current.scrollHeight - container.current.scrollTop) <= container.current.clientHeight + 1) {
                setIsBtnActive(false)
            }
        }
    }

    if(isBtnActive) {
        userListBtnClasses.push(['active'])
    }

    if (!users.length) {
        return (
            <h1 style={{textAlign: 'center'}}>
                users are not founded
            </h1>
        )
    }

    return (
        <div className="userList">
            <h2 className="userList_title">User messages</h2>
            <button 
                onClick={() => scrollBtnHendler()} 
                className={userListBtnClasses.join(' ')}
            >
                scroll to last
            </button>
            <div onScroll={() => activeBtnHendler()} ref={container} className="userList_container">
                {users.map((user, index) => {
                    return <User user={user} key={index}/>
                })}
            </div>
      </div>
    )
}

export default UserList