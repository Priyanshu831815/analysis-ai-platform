import { useContext,useEffect } from "react";

import { AuthContext } from "../auth.context";
import { registerApi,loginApi,logoutApi,getMeApi} from "../services/auth.api";

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }


    const {user,setUser,loading,setLoading}= context

    const handelLogin = async ({email,password}) =>{
      setLoading(true)
      try{
      const data = await loginApi({email,password})
      // console.log('user:', data.user)  
      setUser(data.user)

      }
      catch(error){
        throw error }
      finally{
      setLoading(false)
      }
    
    }
    const handelRegister = async ({username,email,password}) =>{
      setLoading(true)
      try{
      const data = await registerApi({username,email,password})
      setUser(data.user)
      }
      catch(error){
        throw error }
      finally{
      setLoading(false)
      }
      
    }

    const handelLogout = async () =>{
      setLoading(true)
      try{
      const data = await logoutApi()
      setUser(data.user)
      }
      catch(error){
        throw error }
      finally{
      setLoading(false)
      }
    
    }

        useEffect(()=>{
    const fetchuser = async ()=>{
      try{
      const data = await getMeApi()
      setUser(data.user)
    }
     catch(error){
      setUser(null)
     }
     finally{
      setLoading(false)
     }
    }
    fetchuser()
  },[])

    

    return{
        user,loading,handelRegister,handelLogin,handelLogout
    }

}