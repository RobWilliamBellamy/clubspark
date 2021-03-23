import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Team from './Team';
import Teams from './Teams';
import { config } from './configs/config.js';

import './css/App.css';
import 'semantic-ui-css/semantic.min.css';

// Create context to share state.
export const AppContext = createContext();

// Create App.
const App = () => {

    const [teams, setTeams] = useState([]);
    const [countries, setCountries] = useState([]);

    // Get list of teams and unique countries.
    useEffect(() => {

        // Teams list.
        fetch(config.server_root + config.teams_list)
        .then(res => res.json())
        .then(data => setTeams(data.teams))
        
        // Countries list.
        fetch(config.server_root + config.countries_list)
        .then(res => res.json())
        .then(data => setCountries(data.countries))

    }, []);

    return (

        <AppContext.Provider value={ [ teams, countries ] }>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={ Teams } />
                    <Route exact path='/teams' component={ Teams } />
                    <Route exact path='/team/:index' component={ Team } />
                </Switch>            
            </BrowserRouter>
        </AppContext.Provider>
    );
};

export default App;