import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { login } from "../actions/auth";
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      username: "",
      password: "",
      loading: false,
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.form.validateAll();
    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(login(this.state.username, this.state.password))
        .then(() => {
          history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            loading: false
          });
        });
    } else {
      this.setState({
        loading: false,
      });
    }
  }
  render() {
    const { isLoggedIn, message } = this.props;
    if (isLoggedIn) {
      return <Navigate to="/profile" />;
    }
    return (
      <div className="flex items-center min-h-screen bg-white">
      <div className="container mx-auto">
          <div className="min-h-full flex">
            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
              <div className="mx-auto w-full max-w-sm lg:w-96">
                <div>
                  <img
                    className="h-14 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/en/1/14/Maharishi_International_University_logo_1.png"
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign in to MIU Schedule</h2>
                  <p className="mt-2 text-sm text-gray-600">
                    <a href="https://www.miu.edu/" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Maharishi International University
                    </a>
                  </p>
                </div>
    
                <div className="mt-8">
                
                  <div className="mt-6">
                    <Form onSubmit={this.handleLogin} ref={(c) => {this.form = c;}}>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <div className="mt-1">
                          <Input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            value={this.state.username}
                            onChange={this.onChangeUsername}
                            validations={[required]}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="mt-1">
                          <Input
                              type="password"
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              name="password"
                              value={this.state.password}
                              onChange={this.onChangePassword}
                              validations={[required]}
                            />
                        </div>
                      </div>
                      <div>
                          <button
                            type="submit"
                            disabled={this.state.loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            {this.state.loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            Login
                          </button>
                        </div>
                        {message && (
                          <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                              {message}
                            </div>
                          </div>
                        )}
                        <CheckButton
                          style={{ display: "none" }}
                          ref={(c) => {
                            this.checkBtn = c;
                          }}
                        />
                    </Form>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="https://pbs.twimg.com/media/FMpq21PXoAMtWWD?format=jpg&name=4096x4096"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}
function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}
export default connect(mapStateToProps)(Login);