import React, { Component } from "react";
import CourseService from "../services/course.service";
import { Fragment } from 'react'
import { registerCourse } from "../actions/student";
import { Menu, Transition } from '@headlessui/react'
import { MenuAlt1Icon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import Navbar from "./navbar.component";
import { connect } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

class CourseRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      sidebarOpen: false,
      content: "",
      keys: []
    };
    
  }
  componentDidMount() {
    CourseService.getAllByBlock().then(
      response => {
          console.log(response.data)
        this.setState({
            courses: response.data,
        });
      },
      error => {
        this.setState({
            courses:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  onClickHandler = (e) => {
    const { user: currentUser } = this.props;
    e.preventDefault();
    this.setState({
      successful: false,
    });
    
    this.props
    .dispatch(
        registerCourse(currentUser.id, e.target.getAttribute('data-item'))
    )
    .then(() => {
        this.setState({
        successful: true,
        });
    })
    .catch(() => {
        this.setState({
        successful: false,
        });
    });
    window.location.href = 'schedule';
    
 }
  render() {  
    
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
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </form>
              </div>
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
                      <h1 className="text-xl font-semibold text-gray-900">Course Registration</h1>
                      <p className="mt-2 text-sm text-gray-700">
                        List of courses by blocks. You can choose one course for each block.
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-white">
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                  Course Code
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Course Name
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Faculty
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                  Capacity
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                  <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white">
                            {this.state.courses.map((course) => (
                                
                                <Fragment key={course.blockName}>
                                <tr className="border-t border-gray-200">
                                    <th
                                    colSpan={5}
                                    scope="colgroup"
                                    className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                                    >
                                    {course.blockName}
                                    </th>
                                </tr>
                                {course.courses.map((element, courseIdx) => (
                                    <tr
                                    key={courseIdx}
                                    data-item={element.id} 
                                    onClick={this.onClickHandler}
                                    className={classNames(courseIdx === 0 ? 'border-gray-300' : 'border-gray-200', 'border-t')}
                                    >
                                    <td className="hidden">
                                        {element.id}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                        {element.code}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{element.name}</td>         
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{element.faculty.username}</td>          
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{element.capacity}</td>          
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{element.block.name}</td>           
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <button data-item={element.id} className="text-indigo-600 hover:text-indigo-900">
                                        Register<span className="sr-only">, {element.name}</span>
                                        </button>
                                    </td>         
                                    </tr>
                                    
                                ))}
                                </Fragment>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
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
  export default connect(mapStateToProps)(CourseRegistration);