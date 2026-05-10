import React from 'react'
import { RouterProvider } from 'react-router'
import { Approutes } from './routes/Approutes'
import { Authprovider } from './features/auth/auth.context'
import { InterviewProvider } from './features/interview/interview.context'

const App = () => {
  return (
  
      <Authprovider>
        <InterviewProvider>
      <RouterProvider router={Approutes} />
      </InterviewProvider>
      </Authprovider>
    
  )
}

export default App
