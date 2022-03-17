import React, { Component } from "react";
import BlockService from "../services/block.service";
import FacultyService from "../services/faculty.service";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { MenuAlt1Icon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import Navbar from "./navbar.component";
import logo from "../logo.png";
import { connect } from "react-redux";
import { save } from "../actions/course";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
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
const vCourseName = (value) => {
  if (value.length < 3 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The Course name must be between 3 and 40 characters.
      </div>
    );
  }
};

const vCourseCode = (value) => {
  if (value.length < 2 || value.length > 8) {
    return (
      <div className="alert alert-danger" role="alert">
        The Course code must be between 2 and 8 characters.
      </div>
    );
  }
};

class NewCoursePage extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
    this.onChangeCapacity = this.onChangeCapacity.bind(this);
    this.onChangeBlockName = this.onChangeBlockName.bind(this);
    this.onChangeFaculty = this.onChangeFaculty.bind(this);
    this.state = {
      blocks: [],
      faculties: [],
      sidebarOpen: false,
      selectedBlock: undefined,
      selectedFaculty: undefined,
      courseName: "",
      courseCode: "",
      capacity: undefined,
      content: "",
    };
  }
  componentDidMount() {
    BlockService.getAll().then(
      (response) => {
        this.setState({
          blocks: response.data,
        });
      },
      (error) => {
        this.setState({
          blocks:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
    FacultyService.getFaculties().then(
      (response) => {
        this.setState({
          faculties: response.data,
        });
      },
      (error) => {
        this.setState({
          faculties:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
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
          save(this.state.courseName, this.state.courseCode, this.state.capacity
            ,this.state.selectedBlock.id, this.state.selectedFaculty.id)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
          window.location.href = 'courses';
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }  
  }

  onChangeCourseName(e) {
    this.setState({
      courseName: e.target.value,
    });
  }
  onChangeCourseCode(e) {
    this.setState({
      courseCode: e.target.value,
    });
  }
  onChangeCapacity(e) {
    this.setState({
      capacity: e.target.value,
    });
  }
  onChangeBlockName(e) {
    this.setState({
      selectedBlock: e.target.value,
    });
  }
  onChangeFaculty(e) {
    this.setState({
      selectedFaculty: e.target.value,
    });
  }
  render() {
    return (
      <div className="min-h-full">
        <Navbar />
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
                      <img className="h-8 w-8 rounded-full" src={logo} alt="" />
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
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
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
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
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
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  Add New Course
                </h1>
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
                }}  className="space-y-8 divide-y divide-gray-200">
                <div className="space-y-8 divide-y divide-gray-200">
                  <div>
                    <div>
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Course Information
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Course's public details. All fields are required.
                      </p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="course-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Course Name
                          </label>
                          <div className="mt-1">
                            <Input
                              type="text"
                              name="course-name"
                              id="course-name"
                              autoComplete="course-name"
                              validations={[required, vCourseName]}
                              onChange={this.onChangeCourseName}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="course-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Course Code
                        </label>
                        <div className="mt-1">
                          <Input
                            type="text"
                            name="course-code"
                            id="course-code"
                            autoComplete="course-code"
                            validations={[required, vCourseCode]}
                            onChange={this.onChangeCourseCode}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="capacity"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Capacity
                        </label>
                        <div className="mt-1">
                          <Input
                            type="number"
                            name="capacity"
                            id="capacity"
                            autoComplete="capacity"
                            validations={[required]}
                            onChange={this.onChangeCapacity}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <p>&nbsp;</p>
                      <div className="sm:col-span-2">
                        <Combobox
                          as="div"
                          value={this.state.selectedBlock}
                          onChange={(value) =>
                            this.setState({ selectedBlock: value })
                          }
                        >
                          <Combobox.Label className="block text-sm font-medium text-gray-700">
                            Block
                          </Combobox.Label>
                          <div className="relative mt-1">
                            <Combobox.Input
                              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              displayValue={selectedBlock => selectedBlock.name}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            {this.state.blocks.length > 0 && (
                              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {this.state.blocks.map((block) => (
                                  <Combobox.Option
                                    key={block.id}
                                    value={block}
                                    className={({ active }) =>
                                      classNames(
                                        "relative cursor-default select-none py-2 pl-8 pr-4",
                                        active
                                          ? "bg-indigo-600 text-white"
                                          : "text-gray-900"
                                      )
                                    }
                                  >
                                    {({ active, selected }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            "block truncate",
                                            selected && "font-semibold"
                                          )}
                                        >
                                          {block.name}
                                        </span>

                                        {selected && (
                                          <span
                                            className={classNames(
                                              "absolute inset-y-0 left-0 flex items-center pl-1.5",
                                              active
                                                ? "text-white"
                                                : "text-indigo-600"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </Combobox.Option>
                                ))}
                              </Combobox.Options>
                            )}
                          </div>
                        </Combobox>
                      </div>
                      <div className="sm:col-span-2">
                        <Combobox
                          as="div"
                          value={this.state.selectedFaculty}
                          onChange={(value) =>
                            this.setState({ selectedFaculty: value })
                          }
                        >
                          <Combobox.Label className="block text-sm font-medium text-gray-700">
                            Faculty
                          </Combobox.Label>
                          <div className="relative mt-1">
                            <Combobox.Input
                              className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                              displayValue={selectedFaculty => selectedFaculty.name}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                              <SelectorIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>

                            {this.state.blocks.length > 0 && (
                              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {this.state.faculties.map((faculty) => (
                                  <Combobox.Option
                                    key={faculty.id}
                                    value={faculty}
                                    className={({ active }) =>
                                      classNames(
                                        "relative cursor-default select-none py-2 pl-8 pr-4",
                                        active
                                          ? "bg-indigo-600 text-white"
                                          : "text-gray-900"
                                      )
                                    }
                                  >
                                    {({ active, selected }) => (
                                      <>
                                        <span
                                          className={classNames(
                                            "block truncate",
                                            selected && "font-semibold"
                                          )}
                                        >
                                          {faculty.name}
                                        </span>

                                        {selected && (
                                          <span
                                            className={classNames(
                                              "absolute inset-y-0 left-0 flex items-center pl-1.5",
                                              active
                                                ? "text-white"
                                                : "text-indigo-600"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </Combobox.Option>
                                ))}
                              </Combobox.Options>
                            )}
                          </div>
                        </Combobox>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => (window.location.href = "courses")}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
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
    );
  }
}
function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}
export default connect(mapStateToProps)(NewCoursePage);