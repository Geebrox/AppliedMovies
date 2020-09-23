import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { HashRouter, Switch, Route } from 'react-router-dom'
import { MovieProvider } from 'contexts'
import { Home, About, Movie } from 'pages'
import { Header } from './Header'
import generateFontsURL from 'utils/fontsURLGenerator'

import 'assets/tailwind'
import 'nprogress/nprogress.css'

const App = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>AppliedMovies</title>
        <link href={generateFontsURL()} rel="stylesheet" />
      </Helmet>
      <div className="min-h-screen w-full bg-light-bg">
        <div className="container mx-auto px-4">
          <MovieProvider>
            <HashRouter>
              <Header />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route
                  path="/movie/:id"
                  render={(props) => <Movie {...props} />}
                />
              </Switch>
            </HashRouter>
          </MovieProvider>
        </div>
      </div>
    </HelmetProvider>
  )
}

export default App
