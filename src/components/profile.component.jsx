import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import BlockService from "../services/block.service";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuAlt1Icon } from '@heroicons/react/outline'
import Navbar from "./navbar.component";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
      sidebarOpen: false,
      content: ""
    };
  }
  componentDidMount() {
    BlockService.getAll().then(
      response => {
        this.setState({
          blocks: response.data
        });
      },
      error => {
        this.setState({
          blocks:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  
  render() {  
    const { user: currentUser } = this.props;
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return (
      <div className="min-h-full">
        <Navbar/>
        {/* Main column */}
        <div className="lg:pl-64 flex flex-col">
          {/* Search header */}
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
              onClick={() => this.setState({ sidebarOpen: true })}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="profile"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              View profile
                            </a>
                          )}
                        </Menu.Item>
                        </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="logout"
                              className={classNames(
                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              Logout
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1">
            <div>
                <div className="px-4 sm:px-6 lg:px-8">
                  <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                      <h1 className="text-xl font-semibold text-gray-900"><strong>{currentUser.username}</strong> Profile</h1>
                    </div>
                  </div>
                  <div className="container">
                    <p>
                      <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                      {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                    </p>
                    <p>
                      <strong>Id:</strong> {currentUser.id}
                    </p>
                    <p>
                      <strong>Email:</strong> {currentUser.email}
                    </p>
                    <strong>Authorities:</strong>
                    <ul>
                      {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                    </ul>
                  </div>
                            </div>
              </div>
          </main>
        </div>
      </div>
    )
   }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Profile);