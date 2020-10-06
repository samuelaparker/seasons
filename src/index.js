import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends React.Component {
    
    state = {lat: null, long: null, errorMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude, long: position.coords.longitude}), 
            err => this.setState({errorMessage: err.message}) 
        ); 
    }

renderContent() { //helper function 
    if (this.state.errorMessage && !this.state.lat) {
        return <div>Error: {this.state.errorMessage}</div>
    }
    if (!this.state.errorMessage && this.state.lat) {
        return <SeasonDisplay lat={this.state.lat}/>   
    }
    
    return <Loader message='Please accept location request'/>;  

}
    
    render() {         
        return (
            <div className='border red'>
                {this.renderContent()}
            </div>
        )
    } 
}


ReactDOM.render(
<App />,
document.querySelector('#root')

);