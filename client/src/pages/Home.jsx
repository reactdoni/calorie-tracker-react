import React from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import Button from '@mui/material/Button';
import Footer from '../components/Footer'
import StarIcon from '@mui/icons-material/Star';

function Home({isAuthenticated}) {

  const navigate = useNavigate();

  return (
    <>
    <Navbar isAuthenticated={isAuthenticated} />
    <div className="home">
        <div className="firstSection">
          <div className="firstSectionLeft">
              <h3 style={{color: 'white'}}>#1 nutrition tracking app</h3>
              <h1 style={{color: 'white', fontSize: '64px'}}>Reach Your Goals with MyFitnessPal</h1>            
              <h3 style={{color: 'white', fontSize: '18px'}}>Build healthy habits with the all-in-one food, exercise, and calorie tracker.</h3>
              <Button
                style={{marginTop: "12px", width: '200px', height: '50px', backgroundColor: 'white', color:'blue', fontWeight: 'bold', borderTopLeftRadius: '132px', borderBottomLeftRadius: '132px', borderTopRightRadius: '132px', borderBottomRightRadius: '132px'}}
                variant="contained"
                onClick={() => navigate('/login')}
              >
                Join Us
              </Button>
          </div>

          <div className="firstSectionRight">
            <img className="firstSectionImage" src="https://www.myfitnesspal.com/_next/image?url=%2Fpages%2Fhome%2Flogged-out-v2%2Fhero-phone-large.png&w=320&q=75" alt="React Image" />
          </div>
        </div>

        <div className="secondSection">
          <div className="secondSectionStars" style={{marginBottom:'30px'}}>
            <StarIcon style={{color:'yellow', fontSize:'40px' }}/><StarIcon style={{color:'yellow', fontSize:'40px'}}/><StarIcon style={{color:'yellow', fontSize:'40px'}}/><StarIcon style={{color:'yellow', fontSize:'40px'}}/><StarIcon style={{color:'yellow', fontSize:'40px'}}/>
          </div>
          <h1 style={{fontSize:'48px', fontWeight: 600}}>3.7 Million 5-Star Reviews</h1>
        </div>
        <Footer />
    </div>
  </>
  )
}

export default Home