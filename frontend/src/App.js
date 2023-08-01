import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import Routes from "./Routes";
import JoblyApi from "../../api";

function App() {
  const sampleCompanies = [
    {
      handle: "xg",
      name: "XGALAX",
      description: "Global superstar girl group XG",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/XG_LOGO.png?20220321142502"
    },
    {
      handle: "oec",
      name: "Odd Eye Circle",
      description: "KPOP trio reunite",
      logoUrl: "https://b.thumbs.redditmedia.com/pbMx-V81kJGu--FxF0E62rKZBMUf_dZj0frAgF06V8w.png"
    }
  ];

  const [isLoading, setIsLoading] = useState(true);

  const [companies, setCompanies] = useState(sampleCompanies);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getData() {
      let [companies, jobs] = await Promise.all([]);
      setCompanies(sampleCompanies);
      setJobs(jobs);
      setIsLoading(false);
    }
    getData();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes companies={companies} jobs={jobs} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
