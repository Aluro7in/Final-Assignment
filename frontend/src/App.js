import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import RecipeSearch from './pages/RecipeSearch';
import AskAI from './pages/AskAI';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Nutrition from './pages/Nutrition';
import Settings from './pages/Settings';
import StyledComponents from './pages/StyledComponents';

function App() {
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <Navbar userId={userId} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" render={() => <SignIn setUserId={setUserId} />} />
        <Route path="/dashboard" render={() => <Dashboard userId={userId} />} />
        <Route path="/recipes" component={RecipeSearch} />
        <Route path="/ask" component={AskAI} />
        <Route path="/payment" render={() => <Payment userId={userId} />} />
        <Route path="/profile" render={() => <Profile userId={userId} />} />
        <Route path="/nutrition" render={() => <Nutrition userId={userId} />} />
        <Route path="/settings" render={() => <Settings userId={userId} />} />
        <Route path="/styled" component={StyledComponents} />
      </Switch>
    </Router>
  );
}

export default App;