import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
    state = {
        latitude: null,
        errorMessage: null
    };

    componentDidMount() {
        console.log('componentDidMount() called');
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ latitude: position.coords.latitude }),
            err => this.setState({ errorMessage: err.message })
        );
    }

    componentDidUpdate() {
        console.log('componentDidUpdate() called');
    }

    renderContent() {
        let {latitude} = this.state,
            {errorMessage} = this.state;

        if(errorMessage && !latitude)
            return (
                <h4>Error: {errorMessage}</h4>
            );

        if(!errorMessage && latitude)
            return (
                <div>
                    {/* <h4>Latitude: {latitude}</h4> */}
                    <SeasonDisplay lat = {latitude} />
                </div>
            );

        return (
            <Spinner message = "Please accept location request..." />
        );
    }

    render() {
        console.log('render() called');

        return(
            <div className="border red">{this.renderContent()}</div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#root'));