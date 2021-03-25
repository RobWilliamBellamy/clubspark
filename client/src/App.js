import React, { useEffect, useReducer, createContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Team from './Team';
import Teams from './Teams';
import TeamsReducer from './TeamsReducer';
import { config } from './configs/config';

import './css/App.css';
import 'semantic-ui-css/semantic.min.css';

// Create context to share state.
export const AppContext = createContext();

/**
 * App.
 * @returns 
 */
const App = () => {

    const [state, dispatch] = useReducer(
        TeamsReducer, { teams: [], countries: []}
    );

    // Get list of teams and unique countries.
    useEffect(() => {

        // Common fetch options.
        const fetch_options = {
            headers: { 'Content-Type': 'application/json' }
        };

        // Teams list.
        fetch(config.server_root + config.teams_list, fetch_options)
        .then(res => res.json())
        .then(data => dispatch({ type: 'INIT_TEAMS', data: data }));
        
        // Countries list.
        fetch(config.server_root + config.countries_list, fetch_options)
        .then(res => res.json())
        .then(data => dispatch({ type: 'INIT_COUNTRIES', data: data }));

    }, []);

    return (

        <AppContext.Provider value={ [ state, dispatch] }>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={ Teams } />
                    <Route exact path='/teams/:index' render={ (props) => <Teams {...props} /> } />
                    <Route exact path='/team' render={ (props) => <Team {...props} /> } />
                </Switch>            
            </BrowserRouter>
        </AppContext.Provider>
    );
};

export default App;