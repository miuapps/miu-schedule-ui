import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/dashboard.component";
import Profile from "./components/profile.component";
import Dashboard from "./components/dashboard.component";
import NewBlockPage from "./components/new-block.component";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import NewCoursePage from "./components/new-course.component";
import AuthVerify from "./actions/auth-verify"
import AuthService from "./services/auth.service"
import BlockPage from "./components/list-block.component";
import CoursePage from "./components/list-course.component";
import FacultyPage from "./components/faculty-courses.component";
import Schedule from "./components/schedule.component";

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
        showStudentBoard: user.roles.includes("ROLE_STUDENT"),
        showFacultyBoard: user.roles.includes("ROLE_FACULTY"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
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
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/new-block" element={<NewBlockPage/>} />
              <Route path="/blocks" element={<BlockPage/>} />
              <Route path="/new-course" element={<NewCoursePage/>} />
              <Route path="/courses" element={<CoursePage/>} />
              <Route path="/schedule" element={<Schedule/>} />
              <Route path="/faculty" element={<FacultyPage/>} />
            </Routes>
          </div>
        </div>
        <AuthVerify logOut={this.logOut}/>
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