import Head from "next/head";
import Router from "next/router";
import React from "react";
import { mutate, trigger } from "swr";

import SettingsForm from "components/profile/SettingsForm";
import checkLogin from "lib/utils/checkLogin";
import storage from "lib/utils/storage";
import { AppContext } from 'libts'

const Settings = () => {
  React.useEffect(() => {
    storage("user").then(loggedInUser => {
      const isLoggedIn = checkLogin(loggedInUser);
      if (!isLoggedIn) {
        Router.push(`/`);
      }
    })
  })
  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem("user");
    mutate("user", null);
    Router.push(`/`).then(() => trigger("user"));
  };
  const title = 'Your Settings'
  const { setTitle } = React.useContext(AppContext)
  React.useEffect(() => {
    setTitle(title)
  }, [])
  return (
    <>
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">{ title }</h1>
              <SettingsForm />
              <hr />
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
