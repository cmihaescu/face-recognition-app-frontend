import React, {useCallback} from 'react'
import './Dropzone.css'
import {useDropzone} from 'react-dropzone'
import FileBase64 from 'react-file-base64'
 
// const Dropzone = ({base64, picture, onDrop, to64File}) => {
    
//     const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
//     return (
//       <div>
//         <div className='strokemeWhite dropzone center background' {...getRootProps()}>
//         <input {...getInputProps()} />
//         {
//             isDragActive ?
//             <p>Drop the files here ...</p> :
//             <p>Drag 'n' drop a picture here, or click to select one from your computer</p>
//         }
//         <img src={picture} alt=''></img>
//         </div>
//         <div className='margin-bottom'>olo</div>
//       </div>
//     )
//   }

//   export default Dropzone