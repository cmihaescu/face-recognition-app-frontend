import React from 'react'
import Tilt from 'react-tilt'
import './Logo.css'
import logo from  '../../Images/logo.png'

const Logo = ({onClick, help}) => {
        return (
            <div className='logo-container ma3'>
              <div className='logo-box'>
                <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{width:'100px', height:'100px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <div onClick={onClick} className="Tilt-inner"><img alt='logo' src={logo}></img> </div>
                </Tilt>
                <div onClick={onClick} className='help strokemeWhite'>Need some Help?</div>
              </div>
              <div className='instructions'>
                {help?
                  <div className='help-box'>
                    <div className='help-lines strokeme'>
                      1. Find a picture online <br></br>
                      2. Right click on it and select 'open image in new tab'<br></br>
                      3. Right click on image and select 'copy image address'<br></br>
                      4. Paste the image address in the box below<br></br>
                      5. Click on 'Detect' 
                      <br></br><br></br>
                      Some links may not work because of their format or server accessibility.
                      Copying image addresses from photos from Facebook will also work.
                      <br></br><br></br>
                      If there is someone famous in your picture, the agent will know.
                      <br></br><br></br>
                      Simply dragging and dropping an image from your computer in the box will also work. 
                      The image must be a '.jpg' or '.jpeg'.
                    </div>
                    <div className='material-icons'>
                      <span onClick={onClick} class="close material-icons-outlined">close</span>
                    </div>
                  </div>
                  :
                  ''
                }
              </div>
            </div>
        )
}

export default Logo