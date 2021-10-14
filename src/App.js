import './App.css';
import "tachyons";
import React, {Component} from 'react'
import Particles from 'react-particles-js'
import Navigation from './Components/Navigation/Navigation'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Logo from './Components/Logo/Logo'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import Rank from './Components/Rank/Rank'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import ImageUpload from './Components/ImageUpload/ImageUpload'

// import ImageUploader from 'react-images-upload'
// import FileBase64 from 'react-file-base64'
// import Dropzone from './Components/Dropzone/Dropzone'

// do await async ca sa nu mai apara link not bvalid in timp ce scrii


const particlesOptions = {"particles":
 {"number":{"value":250,
             "density":{"enable":true,"value_area":800}},
             "color":{"value":"#ffffff"},
             "shape":{"type":"circle",
                     "stroke":{"width":0,"color":"#000000"},
                     "polygon":{"nb_sides":5},
                     "image":{"src":"img/github.svg","width":100,"height":100}},
 "opacity":{"value":0.5,
            "random":false,
            "anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},
            "size":{"value":3,
                    "random":true,
                    "anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},
                    "line_linked":{"enable":true,"distance":150,"color":"#ffffff",
                    "opacity":0.4,"width":1},
                    "move":{"enable":true,
                            "speed":0.5,
                            "direction":"none",
                            "random":false,
                            "straight":false,
                            "out_mode":"out",
                            "bounce":false,
                            "attract":{"enable":false,"rotateX":600,"rotateY":1200}
                            }
 },
"retina_detect":true}

const initialState = {
  input:'',
    boxes:[],
    imageLoaded:true,
    imageHeight:null,
    detect:false,
    celebrities:[],
    boxesVisible:false,
    helpNeeded:false,
    file: '',
    route:'signin',
    isSignedIn:false,
    user: {
      id:'',
      name:'',
      email: '',
      entries:0,
      joined: ''
    }
}

class App extends Component {
constructor(){
  super();
  this.state = {
    input:'',
    boxes:[],
    imageLoaded:true,
    imageHeight:null,
    detect:false,
    celebrities:[],
    boxesVisible:false,
    helpNeeded:false,
    file: '',
    route:'signin',
    isSignedIn:false,
    user: {
      id:'',
      name:'',
      email: '',
      entries:0,
      joined: ''
    }
  }
  this.handleImageChange = this.handleImageChange.bind(this);
}

//Api Key: adf16535530c4681ab51685fd1458cb7

//Connecting to SERVER

componentDidMount() {
  fetch('https://salty-fortress-99957.herokuapp.com/')
    .then(response => response.json())
    .then(console.log)
    .catch(err => console.log(err))
}

loadUser = (data) => {
  this.setState( {user: {
      id:data.id,
      name:data.name,
      email: data.email,
      entries:data.entries,
      joined: data.joined
  }})
}

//FaceRecognition METHODS

calculateFaceLocation = (data) => {
  const clarifaaiFaceArray = data.outputs[0].data.regions
  const faceLocationsArray = []
  clarifaaiFaceArray.forEach(region => {
    const clarifaiFace = region.region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    const faceLocation = {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height -(clarifaiFace.bottom_row * height)
    }
    faceLocationsArray.push(faceLocation)
  })
  return faceLocationsArray
}

displayFacebox = (boxesArray) => {
  console.log('boxesArray', boxesArray)
  this.setState({boxes:boxesArray})
}

displayCelebritiesNames = (data) => {
  const clarifaaiFaceArray = data.outputs[0].data.regions
  const celebrities = clarifaaiFaceArray.map(celebrity =>
    ({
    name:celebrity.data.concepts[0].name,
    probability:(celebrity.data.concepts[0].value*100).toFixed(2)
  })
    )

  this.setState({celebrities:celebrities},
    (console.log('celebrities state: ', celebrities)))
}

close = () => {
this.setState({
  input:'',
  boxes:[],
  imageHeight:null,
  imageLoaded:true,
  detect:false,
  celebrities:[],
  boxesVisible:false,
  file: ''},
()=> console.log('file: ', this.state.file, 'input:', this.state.input));
document.getElementById('link-box').value='';
document.getElementById('file-box').value=null
}

imageLoaded = (image) => {
  image?
  this.setState({
  imageLoaded:true,
  })
  :
  this.setState({
    imageLoaded:false,
    })
}

//ImageLinkForm METHODS

onInputChange = (event) => {
  this.setState({
    input:event.target.value,
    imageHeight:null,
    imageLoaded:true,
    boxes:[],
    celebrities:[],
    detect:false,
    boxesVisible:false,
    file: ''
  },
  () => {console.log(this.state.input);})
}

onButtonSubmit = () => {
  console.log('detect clicked');
  const image = document.getElementById('inputImage')
    fetch('https://salty-fortress-99957.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input:this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://salty-fortress-99957.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
        .catch(err => console.log('failed to fetch image:', err))
      }
        this.displayFacebox(this.calculateFaceLocation(response));
        this.displayCelebritiesNames(response);
        this.setState({
          boxesVisible:true,
          detect:true,
          imageHeight: Number(image.height)
        },
        () => console.log('detect', this.state.detect));
        console.log('response:', response);
        }
      )
    .catch(error => console.log(error))
}

//DROPZONE METHODS

handleImageChange(e) {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    this.setState({
      imageHeight:null,
      imageLoaded:true,
      boxes:[],
      celebrities:[],
      detect:false,
      boxesVisible:false,
      file: file,
      input: reader.result
    }, 
    ()=> console.log('imagePreviewUrl', this.state.input));
  }

  reader.readAsDataURL(file)

}

// to64File = (picture) => {
//   this.setState({pictures:[picture]},
//     () => {console.log('pictures', this.state.pictures)});
//   this.setState({base64File:this.getFiles(this.state.pictures)},
//   ()=>{console.log('base64File', this.state.base64File)})
// } 

// onDrop = useCallback(acceptedFiles => {
      
// }, [])

//HELP METHODS

helpNeeded = () => {
  this.state.helpNeeded?
  this.setState({helpNeeded:false}, ()=> console.log(this.state.helpNeeded)):
  this.setState({helpNeeded:true}, ()=> console.log(this.state.helpNeeded))
}

//SIGNIN METHODS

onRouteChange = (route) => {
  if(route==='signout') {
    this.setState(initialState)
  }
  else if(route==='home') {
    this.setState({isSignedIn:true})
  }
  this.setState({route:route})
}

render(){

  const {isSignedIn, route, helpNeeded, boxesVisible, boxes, input, celebrities, imageHeight, imageLoaded, detect} = this.state
  const {onRouteChange, onInputChange, onButtonSubmit, close, handleImageChange, loadUser} = this
  return (
    <div id='AppDiv' className="App">
        <Particles 
          className='particles' 
          params = {particlesOptions} />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange={onRouteChange}/>
       {
       route === 'home' 
      ? <div>
          <Logo 
            onClick={this.helpNeeded} 
            help={helpNeeded} />
          <Rank className="strokeme" name={this.state.user.name} entries={this.state.user.entries} />
          <ImageLinkForm 
            onInputChange={onInputChange} 
            onButtonSubmit={onButtonSubmit}/>
          <FaceRecognition 
            boxesVisible={boxesVisible} 
            boxes={boxes} 
            input={input}
            celebrities={celebrities}
            imageHeight={imageHeight} 
            close={close}
            imageLoaded={this.imageLoaded} 
            imageLoadedState={imageLoaded}
            detect={detect}
            />
          <ImageUpload handleImageChange={handleImageChange} />
        </div>
      : (
        route === 'signin'
        ? <Signin onRouteChange={onRouteChange} 
                  loadUser={loadUser} />
        : <Register  onRouteChange={onRouteChange} 
                     loadUser={loadUser} />
      )
      
    }
    </div>
   );
  }
}

export default App;
