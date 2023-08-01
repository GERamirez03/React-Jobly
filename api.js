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

  // Individual API routes

  /** Get details of all companies. */

  static async getAllCompanies() {}

  /** 
   * 
   * [DONE] NEXT STEP: enhance this to be a findAll method, whcih by default gets all companies,
   * but optionally filters by name?
   * 
   * Get data of companies matching name filter (case-insensitive, partial matches).
   * 
   * Accepts nameLike argument specifying what string to compare company names to in backend.
   * 
   * Returns array of companies with matching names.
   * 
   * filters provided in query string of GET request: eg. GET "/companies/?minEmployees=20&maxEmployees=100&nameLike=Aero"
   * 
   * const { minEmployees, maxEmployees, name } = searchFilters;
   */

  static async getCompanies( name = undefined ) {
    // need to pass in name filter to the method parameter is nameLike=Value

    // If passed an argument for name, will find all companies whose names partially match the value.

    const data = (name === undefined)
      ? {}
      : { name };

    let res = await this.request(`companies/`, data);
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on a company's jobs by handle. */

  static async getCompanyJobs(handle) {} // wait is this one irrelevant bc we can just use getCompany and then map the jobs arr?? <- Yup. Company get returns company details with an array of its jobs!

  /** Get details of all jobs. */

  static async getJobs() {}

}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
