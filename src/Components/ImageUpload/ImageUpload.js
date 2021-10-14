import React from 'react'
import './ImageUpload.css'

const ImageUpload = ({handleImageChange}) => {
    
      return (
        <div className="previewComponent">
          <div className='strokemeWhite dropzone center background'>
              <input id='file-box'
                  type="file" 
                  onChange={(e)=>handleImageChange(e)} />
              <p>Drag and Drop your picture here</p>
          </div>
          <div className='margin-bottom'>
          </div>
        </div>
      )
    }
  
    
  export default ImageUpload