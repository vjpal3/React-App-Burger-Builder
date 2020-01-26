import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    constructor() {
      super();
      //Clear if any previous errors
      axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      //set up new errors, if any
      axios.interceptors.response.use(
        res => res,
        error => {
          //error obj returned from Firebase has a message property.
          this.setState({ error: error });
        }
      );
    }

    errorConfirmedHandler = () => {
      this.setState({
        error: null
      });
    };

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {
              //error.message returned from Firebase
            }
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
