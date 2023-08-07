import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Routes from "./Routes";
import JoblyApi from "./api";
import UserContext from "./userContext";

/** App Component for Jobly */

function App() {
  
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");

  /**
   * When a user logs in or signs up, the token state is updated, prompting this effect
   * to fetch all of the user's pertinent information and store it within the currentUser
   * state for use throughout Jobly.
   */

  useEffect(() => {
    async function getUserDataFromApi() {
      let user = await JoblyApi.getUserData();
      const { username, firstName, lastName, email, applications } = user;
      setCurrentUser({ username, firstName, lastName, email, applications });
    }
    getUserDataFromApi();
  }, [token]);

  /**
   * Calls backend to log a user in with the provided username and password in the "user" object passed in.
   * 
   * If login is successful (i.e. returns a token), stores the username and token in the currentUser and token states
   * as well as localStorage.
   */

  async function login(user) {
    let [username, token] = await JoblyApi.postUserCredentials(user);

    if (token) {
      setToken(token);
      setCurrentUser({ username });

      // add user to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
    }
  }

  /**
   * Calls backend to register a new user with the provided username, password, firstName, lastName, and email in the "user" object passed in.
   * 
   * If signup is successful (i.e. returns a token), stores the username and token in the currentUser and token states
   * as well as localStorage.
   */

  async function signup(newUser) {
    let [username, token] = await JoblyApi.postNewUser(newUser);

    if (token) {
      setToken(token);
      setCurrentUser({ username });

      // add user to localStorage
      localStorage.setItem("username", username);
      localStorage.setItem("token", token);
    }
  }

  /**
   * Logs a user out of Jobly by clearing their information from the JoblyApi helper class,
   * the App's state, and localStorage.
   */

  async function logout() {
    JoblyApi.clearUserData();
    setToken("");
    setCurrentUser({});

    // remove user from localStorage
    localStorage.clear();
  }

  /**
   * Calls backend to update a user's information with the optional first name, last name, and email changes passed in through the UserData object.
   * 
   * If profile update is successful (i.e. returns the updated user profile), updates the currentUser object in state. Token and username do not change.
   */

  async function updateProfile(userData) {
    let user = await JoblyApi.patchUserData(userData);
    if (user) {
      setCurrentUser(user);
    }
  }

  /**
   * Calls backend to post an application from the currentUser to the job posting specified by jobId.
   * 
   * If the application is successful (i.e. returns the jobId as "applied"), updates the currentUser object in state to include the jobId within the
   * currentUser's applications array.
   */

  async function apply(jobId) {
    let jobAppNum = await JoblyApi.postJobApplication(jobId);
    if (jobAppNum) {
      setCurrentUser(cUser => {
        const clone = { ...cUser };
        clone.applications.push(jobAppNum);
        return clone;
      });
    }
  }

  /**
   * After initial render, make an initial call to the Jobly API to get all Company and Job data to store in state.
   * 
   * Also checks localStorage for user information. If there is a token in localStorage, sets the token in state as
   * the token from localStorage. In this case, this effect will also call the JoblyApi helper class to set its
   * user data as the username and token found in localStorage.
   */

  useEffect(() => {
    async function getData() {
      let [companies, jobs] = await Promise.all([JoblyApi.getCompanies(), JoblyApi.getJobs()]);
      setCompanies(companies);
      setJobs(jobs);
    }
    function rememberUser() {
      let [storedUsername, storedToken] = [localStorage.getItem("username"), localStorage.getItem("token")];
      if (storedToken) {
        JoblyApi.setUserData(storedUsername, storedToken);
        setToken(storedToken);
      }
    }
    getData();
    rememberUser();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser, login, signup, logout, updateProfile, apply }} >
          <NavBar />
          <main>
            <Routes companies={companies} jobs={jobs} />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
