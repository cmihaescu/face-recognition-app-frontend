import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({input, boxes, boxesVisible, close, 
    celebrities, imageHeight, imageLoaded, imageLoadedState, detect}) => {
    
        const celebritiesNames = celebrities.map(celebrity => celebrity.name)

    //Capitalizing names of celebrities

    const capitalizedCelebrities = []    
    const capitalizeString = (fullName) => {
        const names = fullName.split(/[ -]+/);
        for (let i = 0; i < names.length; i++) {
            names[i] = names[i][0].toUpperCase() + names[i].substr(1);
            }
        const name = names.join(' ')
        capitalizedCelebrities.push(name)
    }

    const capitalizeNames = (array) => {
           array.map(item => capitalizeString(item))
        }

    capitalizeNames(celebritiesNames)

    for (let i=0; i< celebrities.length; i++) {
        celebrities[i].name = capitalizedCelebrities[i]
    }
    console.log('celebrities', celebrities)
    
    //Detecting face boxes

    const locationsArray =[]
    boxes.forEach(box => locationsArray.push(Object.values(box)))
    
        return (
            <div className='center examined-image'>
            <img id='test-image' src={input} alt='test'></img>
                {input 
                ?
                imageLoadedState
                ? 
                <div className='celebrities-and-image-container'>
                  <div className='image-container' style={{height:imageHeight}}>
                      <div className='displayed-picture'>
                          <img 
                          onLoad={()=>{console.log('image loaded'); imageLoaded(true)}}
                          onError={()=>{console.log('image failed'); imageLoaded(false)}}
                          id='inputImage' 
                          src = {input} 
                          alt=''>
                          </img>
                      </div>
                      {locationsArray.map((item, i)=> 
                      boxesVisible?

                      <div className='test' 
                        style={{left:item[0],
                              top:item[1] , 
                              right:item[2], 
                              bottom:item[3]}}>
                        <div className='bounding-box'> 
                            <div className='celebrity-number strokeme'>
                                {i+1}
                            </div>
                        </div>
                            <div className='strokemeWhite name-on-picture'>
                                {capitalizedCelebrities[i]}                        
                            </div>                       
                      </div>
                      :
                      ''
                      )}
                  </div>
                  <div className='celebrities-results-container'>
                      {detect 
                       ?
                      <div>
                          <ol className='celebrities-list strokeme'>
                              {celebrities.map(celebrity => 
                              <li>{Number(celebrity.probability)>5 ?
                                `${celebrity.name} ${celebrity.probability}%`
                                : `Bad angle or person not famous enough, but there is a resemblance to ${celebrity.name}`
                            }</li>)}
                          </ol>
                      </div>
                      :
                      <div className='center strokeme'>Press Detect button</div>}
                      <div className='material-icons'>
                          <span onClick={close} class="close material-icons-outlined">close</span>
                      </div>
                  </div>
            </div>
            :
            <div className='celebrities-and-image-container strokeme'>
                <p style={{padding:1}}> Link not valid</p>
              <div className='grow material-icons'>
                <span onClick={close} class="close material-icons-outlined">close</span>
              </div>
             </div>
            :
            <div>
                <p className='strokeme center imageFailed'>Copy the image address of a picture from the internet and press 'Detect'</p>
                <p className='strokeme center imageFailed'>OR</p>
            </div>
            }
        </div>
        )
}

export default FaceRecognition