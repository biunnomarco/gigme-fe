import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ArtistRegister from './Pages/Registration/ArtistRegiser'
import Login from './Pages/Login'
import ValidationPage from './Pages/ValidationPage'
import MyNav from './Components/MyNav/MyNav'
import RegistrationPage from './Pages/Registration/RegistrationPage'
import LocalRegistrationPage from './Pages/Registration/LocalRegistrationPage'
import MyFooter from './Components/MyFooter/MyFooter'
import ProtectedRoutes from './Middlewares/ProtectedRoutes';
import ArtistHomepage from './Pages/Homepages/ArtistHomepages'
import LocalHomepage from './Pages/Homepages/LocalHomepage'
import Redirect from './Pages/Redirect'
import SingleArtistPage from './Pages/SinglePages/SingleArtistPage'
import ValidationWait from './Pages/ValidationWait'
import LocalRegister from './Pages/Registration/LocalRegister'
import SingleEventPage from './Pages/SinglePages/SingleEventPage'
import ArtistDashboard from './Pages/Dashboards/ArtistDashboard'
import SingleLocalPage from './Pages/SinglePages/SingleLocalPage'
import LocalDashboard from './Pages/Dashboards/LocalDashboard'
import ArtistValidationPage from './Pages/ArtistValidationPage'
import SingleEventLocalPage from './Pages/SinglePages/SingleEventLocalPage'




const App = () => {
  return (
    <BrowserRouter>
  <MyNav />
      
        <Routes>

          <Route exact path='/' element={<RegistrationPage />} />
          <Route path='/validationWait' element={<ValidationWait />} />
          <Route path='/localRegistration' element={<LocalRegister />} />
          <Route path='/redirect' element={<Redirect />} />
          <Route path='/artistRegistration' element={<ArtistRegister />} />

          <Route path='/login' element={<Login />} />
          <Route path='/validator/:id' element={<ValidationPage />} />
          <Route path='/artistValidator/:id' element={<ArtistValidationPage />} />


          <Route element={<ProtectedRoutes />}>

            <Route path='/singleLocalPage/:id' element={<SingleLocalPage />} />
            <Route path='/singleArtistPage/:id' element={<SingleArtistPage />} />
            <Route path='/artistHomepage' element={<ArtistHomepage />} />
            <Route path='/localHomepage' element={<LocalHomepage />} />
            <Route path='/eventPage/:id' element={<SingleEventPage />} />
            <Route path='/artistDashboard/:id' element={<ArtistDashboard />} />
            <Route path='/localDashboard/:id' element={<LocalDashboard />} />
            <Route path='/eventLocalPage/:id' element={<SingleEventLocalPage />} />

          </Route>


        </Routes>
     <MyFooter />




    </BrowserRouter >
  )
}

export default App
