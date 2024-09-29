import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSiteSettings } from "redux-store/settings/site.settings.slice";

const GlobalDataLoader = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSiteSettings());
  }, []);
  return children;
};

export default GlobalDataLoader;
