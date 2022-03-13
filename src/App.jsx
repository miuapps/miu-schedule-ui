import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/dashboard.component";
import Profile from "./components/profile.component";
import DashboardStudent from "./components/dashboard-student.component";
import DashboardFaculty from "./components/dashboard-faculty.component";
import DashboardAdmin from "./components/dashboard-admin.component";
import NewBlockPage from "./components/new-block.component";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import NewCoursePage from "./components/new-course.component";
import AuthService from "./services/auth.service"
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showFacultyBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }
  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        showFacultyBoard: user.roles.includes("ROLE_FACULTY"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
    this.setState({
      showFacultyBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showFacultyBoard, showAdminBoard } = this.state;
    return (
      <Router>
        {/*{currentUser && (
        <Navbar/>)}*/}
        <div>
        {/*<nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">
              bezKoder
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="home" className="nav-link">
                  Home
                </Link>
              </li>
              {showFacultyBoard && (
                <li className="nav-item">
                  <Link to="mod" className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to="admin" className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link to="user" className="nav-link">
                    User
                  </Link>
                </li>
              )}
            </div>
            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="profile" className="nav-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="register" className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>*/}
          <div className="container mt-3">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/register" element={<Register/>} />
              <Route exact path="/profile" element={<Profile/>} />
              <Route path="/student" element={<DashboardStudent/>} />
              <Route path="/faculty" element={<DashboardFaculty/>} />
              <Route path="/admin" element={<DashboardAdmin/>} />
              <Route path="/new-block" element={<NewBlockPage/>} />
              <Route path="/new-course" element={<NewCoursePage/>} />
            </Routes>
          </div>
        </div>
        
      </Router>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(App);