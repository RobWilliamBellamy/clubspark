import { useContext } from 'react';
import { Table, Image, Form, Input } from 'semantic-ui-react';
import { AppContext } from './App';

import './css/Teams.css';

const Team = (props) => {

    // Use context to access state.
    const [ state, dispatch ] = useContext(AppContext);   
    
    const index = props.match.params.index 
    const team = state.teams[index];

    const team_img = 'http://img.uefa.com/imgml/TP/teams/logos/70x70/' + team.id + '.png';
    const team_page = `https://www.uefa.com/teamsandplayers/teams/club=${team.id}/profile/index.html`;
    const team_eliminated = (team.eliminated === 'true') ? true : false;

    // Open official team UEFA page.
    const openLink = (e) => {
        window.open(team_page, '_blank');
    };

    // Update team name.
    const changeTeamName = (f) => {
        
        team.name = f.value;
        dispatch({ type: 'UPDATE_TEAM', data: team, index: index });
    };

    // Select country.
    const selectCountry = (e, f) => {

        team.country = f;
        dispatch({ type: 'UPDATE_TEAM', data: team, index: index });
    };

    // Eliminated check-box changed.
    const selectCheckBox = (data) => {

        team.eliminated = data.checked;
        dispatch({ type: 'UPDATE_TEAM', data: team, index: index });
    };

    // Create options for country drop-down.
    let country_options = [];
    state.countries.forEach((c, i) => {
                
        country_options.push({
            key: i++,
            text: c.country,
            value: c.country
        });
    });

    return (<div>  
                <h1><Image size='mini' src={ team_img} verticalAlign='top' />
                        <span>&nbsp;Team Detail Page</span>
                </h1>
                <p>Click <a onClick={ (e) => openLink(e) } >here</a> for the official UEFA team page.</p>
                <Table celled striped>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Key</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>                        
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Id</Table.Cell>
                            <Table.Cell>{ team.id }</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Name</Table.Cell>                            
                            <Table.Cell>
                                <Form.Field control={Input}
                                            value={ team.name }
                                            placeholder='Team Name'
                                            onChange={ (e, f) => changeTeamName(f) }
                                />                               
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Country</Table.Cell>
                            <Table.Cell>
                                <Form.Select options={ country_options }
                                             placeholder="Available Countries"
                                             value={ team.country }                             
                                             onChange={ (event, field) => selectCountry(team.country, field.value) }
                                             search
                                />   
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Eliminated</Table.Cell>
                            <Table.Cell>
                                <Form.Group>
                                    <Form.Checkbox key={ 'check_box_' + team.country } 
                                                   defaultChecked={ team_eliminated } 
                                                   onChange={ (event, data) => selectCheckBox(data) } />
                                </Form.Group>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='5'>
                        </Table.HeaderCell>
                    </Table.Row>
                    </Table.Footer>
                </Table>
            </div>);
};

export default Team;