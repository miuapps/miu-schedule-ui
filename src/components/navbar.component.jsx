import React, { Component } from "react";
import { Fragment } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  HomeIcon,
  XIcon,
  CheckCircleIcon,
  BookOpenIcon,
  CalendarIcon,
  CubeTransparentIcon,
  SelectorIcon,
  AcademicCapIcon
} from "@heroicons/react/outline";
import logo from "../logo.png";
import { connect } from "react-redux";
import AuthService from "../services/auth.service";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      content: "",
    };
  }
  componentDidMount() {
    const user = this.props.user;
    if (user) {
      this.setState({
        currentUser: user,
        isStudent: user.roles.includes("ROLE_STUDENT"),
        isFaculty: user.roles.includes("ROLE_FACULTY"),
        isAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }
  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }
  render() {
    const user = this.props.user;
    const navigation = [
      { name: "Home", href: "#", icon: HomeIcon, current: true },
      { name: "Blocks", href: "blocks", icon: CubeTransparentIcon, current: false, visible: user.roles.includes("ROLE_ADMIN") },
      { name: "Courses", href: "courses", icon: BookOpenIcon, current: false, visible: user.roles.includes("ROLE_ADMIN") },
      { name: "Faculty Courses", href: "faculty", icon: AcademicCapIcon, current: false, visible: user.roles.includes("ROLE_FACULTY") },
      {
        name: "Course Registration",
        href: "course-registration",
        icon: CheckCircleIcon,
        current: false,
        visible: user.roles.includes("ROLE_STUDENT")
      },
      {
        name: "Schedule",
        href: "schedule",
        icon: CalendarIcon,
        current: false,
        visible: user.roles.includes("ROLE_STUDENT")
      },
    ];
    const { user: currentUser } = this.props;
    return (
      <div>
        <Transition.Root show={this.state.sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={() =>
              this.setState({ sidebarOpen: !this.state.sidebarOpen })
            }
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => this.setState({ sidebarOpen: false })}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src={logo} alt="Workflow" />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.visible
                              ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                              : "hidden",
                            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={classNames(
                              item.current
                                ? "text-gray-500"
                                : "text-gray-400 group-hover:text-gray-500",
                              "mr-3 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100">
          <div className="flex items-center flex-shrink-0 px-6">
            <img className="h-14 w-auto" src={logo} alt="Workflow" />
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-6 h-0 flex-1 flex flex-col overflow-y-auto">
            {/* User account dropdown */}
            <Menu as="div" className="px-3 relative inline-block text-left">
              <div>
                <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                  <span className="flex w-full justify-between items-center">
                    <span className="flex min-w-0 items-center justify-between space-x-3">
                      <img
                        className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                        src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        alt=""
                      />
                      <span className="flex-1 flex flex-col min-w-0">
                        <span className="text-gray-900 text-sm font-medium truncate">
                          {currentUser.email}
                        </span>
                        <span className="text-gray-500 text-sm truncate">
                          @{currentUser.username}
                        </span>
                      </span>
                    </span>
                    <SelectorIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
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
                <Menu.Items className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none">
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
                          href="login"
                          onClick={this.logOut}
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
            {/* Navigation */}
            <nav className="px-3 mt-6">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.visible
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        : "hidden",
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-gray-500"
                          : "text-gray-400 group-hover:text-gray-500",
                        "mr-3 flex-shrink-0 h-6 w-6"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}
export default connect(mapStateToProps)(Navbar);
