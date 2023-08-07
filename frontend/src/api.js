import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;
  static username;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Individual API routes */

  /** 
   * Make a GET request to the Jobly API's companies route
   * for getting information on all companies.
   * 
   * Optionally filters companies based on the company name
   * passed in the name argument.
   * 
   * If successful, returns an array of company objects.
   * Else, returns undefined.
   */

  static async getCompanies( name = undefined ) {

    const data = (name === undefined)
      ? {}
      : { name };

    let res = await this.request(`companies/`, data);
    return res.companies;
  }

  /** 
   * Make a GET request to the Jobly API's company
   * details route for getting information on the
   * company specified in the handle parameter.
   * 
   * If successful, returns a company object.
   * Else, returns undefined.
   */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** 
   * Make a GET request to the Jobly API's jobs route
   * for getting information on all jobs.
   * 
   * Optionally filters jobs based on the job title
   * passed in the title argument.
   * 
   * If successful, returns an array of job objects.
   * Else, returns undefined.
   */

  static async getJobs( title = undefined ) {

    const data = (title === undefined)
      ? {}
      : { title };

    let res  = await this.request(`jobs/`, data);
    return res.jobs;
  }

  /**
   * Make a POST request to the Jobly API's authentication route
   * for registering a new user and receiving a token, sending the
   * information in the newUser object passed in.
   * 
   * newUser = { username, password, firstName, lastName, email }
   * 
   * If registration is successful, returns an array with the 
   * username and assigned token. The JoblyApi helper class's
   * username and token properties are also set these values.
   * 
   * Else, returns undefined.
   */

  static async postNewUser(newUser) {
    
    let res = await this.request(`auth/register`, newUser, "post");
    let token = res.token;

    if (token) {
      const { username } = newUser;

      JoblyApi.username = username;
      JoblyApi.token = token;

      return [username, token];
    }
  }

  /**
   * Make a POST request to the Jobly API's authentication route
   * for logging in and receiving a token, sending the credentials
   * in the user object passed in.
   * 
   * user = { username, password }
   * 
   * If authentication is successful, returns an array with the 
   * username and assigned token. The JoblyApi helper class's
   * username and token properties are also set these values.
   * 
   * Else, returns undefined.
   */

  static async postUserCredentials(user) {

    let res = await this.request(`auth/token`, user, "post");
    let token = res.token;

    if (token) {
      const { username } = user;

      JoblyApi.username = username;
      JoblyApi.token = token;

      return [username, token];
    }
  }

  /**
   * Make a GET request to the Jobly API's user information route
   * for the current user.
   * 
   * The current user is specified by the JoblyApi's username property.
   * 
   * Returns a user object if successful; else, returns undefined.
   */

  static async getUserData() {
    let res = await this.request(`users/${JoblyApi.username}`);
    return res.user;
  }

  /**
   * Make a PATCH request to the Jobly API's profile update route
   * for the current user, sending the userData specified.
   * 
   * Returns the updated user object if successful; else, returns undefined.
   */

  static async patchUserData(userData) {

    // clean the data to conform with API schema
    delete userData.username;

    let res = await this.request(`users/${JoblyApi.username}`, userData, "patch");
    let user = res.user;

    // if successful, clear isAdmin and return the user object

    if (user) {
      delete user.isAdmin;
      return user;
    }
  }

  /**
   * Sets the JoblyApi helper class's username and token to be the values specified.
   */

  static setUserData(username, token) {
    JoblyApi.username = username;
    JoblyApi.token = token;
  }

  /**
   * Clears the username and token values from the JoblyApi helper class.
   */

  static clearUserData() {
    JoblyApi.username = null;
    JoblyApi.token = null;
  }

  /** 
   * Make a POST request to the Jobly API's job applications route for the current user
   * to apply to the job specified by jobId.
   * 
   * Returns the jobId if successful; else returns undefined.
   */

  static async postJobApplication(jobId) {

    let res = await this.request(`users/${JoblyApi.username}/jobs/${jobId}`, {}, "post");

    return res.applied;
  }

}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTEyNjk1NTZ9.TJNMPLpZK_1OtP8s_wRFbeyTxNdOLBBA9y-IgXq5WEo";

export default JoblyApi;
