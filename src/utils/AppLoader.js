import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
export var loaderRef = React.createRef();


 export function reloadRef()
 {
  console.log("calllef red");
  loaderRef = React.createRef();
}

export function showLoader() {

    let ref = loaderRef.current
      console.log('loader :'+ ref);
    if (ref) {

        ref.showLoader()
    }
}



export function hideLoader() {
    let ref = loaderRef.current
    if (ref) {
        ref.hideLoader()
    }
}



class AppLoader extends React.Component {

    constructor(props) {
        super(props)
        this.state = { loader: false }
    }

    showLoader() {
        this.setState({ loader: true })
    }

    hideLoader() {
        this.setState({ loader: false })
    }

    render() {
        return (
            <Spinner visible={this.state.loader} />
        );
    }
};

export default AppLoader
