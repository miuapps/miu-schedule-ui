import React, { Component } from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { MenuAlt1Icon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import Navbar from "./navbar.component";
import { connect } from "react-redux";
import logo from "../logo.png"
import { save } from "../actions/block";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vBlockName = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The Block name must be between 3 and 40 characters.
      </div>
    );
  }
};

const vDate = (value) => {
  if (value.length < 8 || value.length > 30) {
    return (
      <div className="alert alert-danger" role="alert">
        Please enter proper date.
      </div>
    );
  }
};

class NewBlockPage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeBlockName = this.onChangeBlockName.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.state = {
      sidebarOpen: false,
      blockName: "",
      startDate: "",
      endDate: "",
      successful: false,
      content: ""
    };
  }
  onChangeBlockName(e) {
    this.setState({
      blockName: e.target.value,
    });
  }
  onChangeStartDate(e) {
    this.setState({
      startDate: e.target.value,
    });
  }
  onChangeEndDate(e) {
    this.setState({
      endDate: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          save(this.state.blockName, this.state.startDate, this.state.endDate)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
          window.location.href = 'blocks';
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
        window.location.href = 'blocks';
    }
  }
  render() {  
    const { message } = this.props;
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
                        src={logo}
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
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">Add New Block</h1>
              </div>
              <div className="mt-4 flex sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  className="order-1 ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                >
                  Share
                </button>
                <button
                  type="button"
                  className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1 sm:ml-3"
                >
                  Create
                </button>
              </div>
            </div>
            <div className="p-8">
            <Form onSubmit={this.handleSubmit}
            ref={(c) => {
              this.form = c;
            }} className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-8 divide-y divide-gray-200">
                <div>
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Block Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Block's public details. All fields are required.
                    </p>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="block-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Block Name
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            name="block-name"
                            id="block-name"
                            autoComplete="block-name"
                            validations={[required, vBlockName]}
                            onChange={this.onChangeBlockName}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <br/>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="start-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Start Date
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          name="start-date"
                            id="start-date"
                          autoComplete="start-date"
                          validations={[required, vDate]}
                          onChange={this.onChangeStartDate}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="end-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        End Date
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          name="end-date"
                          id="end-date"
                          autoComplete="end-date"
                          validations={[required, vDate]}
                          onChange={this.onChangeEndDate}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    </div>
                </div>
              </div>
              {message && (
                <div className="form-group">
                  <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                    {message}
                  </div>
                </div>
              )}                   
              <div className="pt-5">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => window.location.href = 'blocks'}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
            </div>
            
          </main>
        </div>
      </div>
    )
   }
}
function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}
export default connect(mapStateToProps)(NewBlockPage);