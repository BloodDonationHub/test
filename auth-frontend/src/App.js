import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './container/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import BecomeVolunteer from './components/BecomeVolunteer'; // Import the component
import './App.css';
import Contact from './components/Contact';
import BloodBank from './components/BloodBank';
import DonateBlood from './components/DonateBlood';
import News from './components/News';
import Media from './components/Media';
import BloodForm from './components/BloodForm';
import Events from './components/Event';
import Tips from './components/Tips';
import Introduction from './components/Introduction ';
import StructureDevelopment from './components/StructureDevelopment ';
import VaccineInfo from './components/Vaccine';
import BecomeMember from './components/BecomeMember';
import NearbyBloodBanks from './pages/NearbyBloodBanks';
import BloodSearch from './components/BloodSearch';


function App() {
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="app">
            <Navbar />  
            <Routes>
               <Route path="/media" element={<Events />} />
               <Route path="/nearby-blood-banks" element={<NearbyBloodBanks />} />
                   <Route path="/become-member" element={<BecomeMember />} />
                <Route path="/about/vaccine" element={<VaccineInfo />} />
                <Route path="/about/structure-development" element={<StructureDevelopment />} />
                <Route path="/about/introduction" element={<Introduction />} />
                 <Route path="/tips" element={<Tips />} />
                  <Route path="/events" element={<Media />} />
                <Route path="/BloodForm" element={<BloodForm />} />
                <Route path="/blood-search" element={<BloodSearch />} />
               <Route path="/blood-banks" element={<BloodBank />} />
               <Route path="/news" element={<News/>}/>
               <Route path="/donate" element={<DonateBlood/>}/>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Add the volunteer route */}
              <Route path="/become-volunteer" element={<BecomeVolunteer />} />
            <Route path="/contact" element={<Contact />} />
           
          
            </Routes>
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;