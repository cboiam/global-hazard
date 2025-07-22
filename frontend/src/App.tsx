import qs from "qs";
import Main from "./components/Main";
import Nav from './components/Nav';
import { useState, useEffect } from "react";
import { AppQueryParams } from "./types/params";
import { useLocation } from "react-router";

const paramsBypassRoutes: RegExp[] = [
  /\/events\/.*\/summary/
];

const App = () => {
  const location = useLocation();
  const search = qs.parse(location.search.substring(1)) as AppQueryParams;
  const [params, setParams] = useState(search);
  useEffect(() => {
    if (paramsBypassRoutes.some(p => location.pathname.match(p)))
      return;
    setParams(search);
  }, [search.days, search.categories, search.ongoing]);

  return (
    <div className="App">
      <Nav params={params} />
      <Main params={params} />
    </div>
  );
}

export default App;
