import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AppliedMovies</title>
      </Helmet>
      <div className="h-screen bg-green-600 flex justify-center items-center p-4 flex-col">
        <h1 data-test="greeting" className="text-white text-4xl text-center">
          AppliedMovies
        </h1>
      </div>
    </HelmetProvider>
  )
}

export default App
