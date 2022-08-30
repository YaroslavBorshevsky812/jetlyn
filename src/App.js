import axios from "axios"
import { PATH_SMALLDATA, PATH_BIGDATA, PATH_ERRORDATA } from './config/config'
import { useMemo, useEffect, useState,  } from "react"
import UserList from './components/userList/UserList'
import Select from './components/select/Select'
import Loader from './components/loader/Loader'
import MyInput from './components/input/MyInput'
import { useFetching } from "./hooks/useFetching"
 
const App = props => {

  const [userList, setUserList] = useState([])
  const [selectedSort, setSelectedSort] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [searchQueary, setSearchQuery] = useState('')

  useEffect(() => {
    getData()
  }, [])

  const [getData, isLoading, userError] = useFetching( async () => { 
    const response = await axios.get(PATH_SMALLDATA, {
    })
    setUserList(response.data)
    setIsLoaded(true)
  })

  const sortedUsers = useMemo(() => {
    if(selectedSort) {
      switch(selectedSort) {
        case 'по возрастанию':
          return [...userList].sort((a, b) => a["timestamp"].localeCompare(b["timestamp"]))
        case 'по убыванию':
          return [...userList].sort((a, b) => b["timestamp"].localeCompare(a["timestamp"]))
      }
    }
    return userList
  }, [selectedSort, userList])

  const sortedAndSearchUsers = useMemo(() => {
    return sortedUsers.filter(user => user.firstName.includes(searchQueary) || user.lastName.includes(searchQueary))
  }, [searchQueary, sortedUsers])

  const sortUsers = (sort) => {
    setSelectedSort(sort)
  }

    return (
      <div className="mainPage">
        <Select
          value={selectedSort}
          onChange={sortUsers}
          defaultValue='Сортировать по дате'
          options={[
            {value: 'по убыванию', name: 'по убыванию'},
            {value: 'по возрастанию', name: 'по возрастанию'}
          ]}
        />
        <MyInput
          value={searchQueary}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="поиск..."
        />
        {userError && 
          <h2 className="error"> ошибка {userError}</h2>
        }
        {
          isLoading
                ? <div><Loader/></div>
                : <UserList loaded={isLoaded} users={sortedAndSearchUsers}/>
        }
      </div>
    ) 
  
}

export default App

