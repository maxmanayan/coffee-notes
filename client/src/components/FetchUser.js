import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"


const FetchUser = (props) => {
  const [loaded, setLoaded] = useState(false)
  const { authenticated, setUser } = useContext(AuthContext)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    if (authenticated || !localStorage.getItem('access-token')) {
      setLoaded(true)
      return
    }

    try {
      const res = await axios.get('/api/auth/validate_token')
      setUser({ user: res.data.data })
    } catch (error) {
      console.error("Unable to validate token. Error details: " + error)
    } finally {
      setLoaded(true)
    }
  }

  return loaded ? props.children : null
}

export default FetchUser