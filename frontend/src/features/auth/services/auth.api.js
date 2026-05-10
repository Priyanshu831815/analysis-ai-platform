import axiosInstance from "../../../api/axiosInstance";

export const registerApi = async ({username,email,password})=>{
try{
const response =  await axiosInstance.post('/auth/user/register',{
    username,email,password
 })

 return response.data
}
catch(error){
    console.error(error) 
    throw error
}
}

export const loginApi=async ({email,password})=>{
try{
const response =  await axiosInstance.post('/auth/user/login',{
email,password
 })

 return response.data
}
catch(error){
    console.error(error) 
    throw error
}
}

export const logoutApi=async ()=>{
try{
const response =  await axiosInstance.post('/auth/user/logout')

 return response.data
}
catch(error){
    console.error(error) 
    throw error
}
}


export const getMeApi= async()=>{
    try{
const response =  await axiosInstance.get('/auth/user/get-profile')

 return response.data
}
catch(error){
    console.error(error) 
    throw error
}
}