import React from "react";
import {Switch,Route} from 'react-router-dom'
import WatchSelector from './components/WatchSelector';
import AboutMe from './components/AboutMe';
import AboutWathes from './components/AboutWathes';


const AppRoutes = () => (
	<Switch>
        <Route exact path="/" component={WatchSelector}/>
        <Route exact path="/index.html" component={WatchSelector}/>
        <Route exact path="/about-watches" component={AboutWathes}/>
        <Route exact path="/about-me" component={AboutMe}/>
	</Switch>
);

export default AppRoutes;
