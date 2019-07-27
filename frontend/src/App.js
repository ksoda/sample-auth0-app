import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import Question from "./Question/Question";
import Questions from "./Questions/Questions";
import Callback from "./Callback";
import NewQuestion from "./NewQuestion/NewQuestion";
import SecuredRoute from "./SecuredRoute/SecuredRoute";
import auth0Client from "./Auth";

class App extends Component {
  async componentDidMount() {
    if (this.props.location.pathname === "/callback") return;
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== "login_required") console.log(err.error);
    }
  }
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path="/" component={Questions} />
        <Route exact path="/questions/:questionId" component={Question} />
        <Route exact path="/callback" component={Callback} />
        <SecuredRoute path="/new-question" component={NewQuestion} />
      </div>
    );
  }
}

export default withRouter(App);
