import { useContext } from 'react';
import { Table, Image } from 'semantic-ui-react';
import { AppContext } from './App';

import './css/Teams.css';

const Team = (props) => {

    // Use context to access state.
    const [teams] = useContext(AppContext);
    const [countries] = useContext(AppContext);
    const team = teams[props.match.params.index];

    const team_img = 'http://img.uefa.com/imgml/TP/teams/logos/70x70/' + team.id + '.png';
    const team_page = `https://www.uefa.com/teamsandplayers/teams/club=${team.id}/profile/index.html`

    // Open official team UEFA page.
    const openLink = (e) => {
        window.open(team_page, '_blank');
    };

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
                            <Table.Cell>{ team.name }</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Country</Table.Cell>
                            <Table.Cell>{ team.country }</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Eliminated</Table.Cell>
                            <Table.Cell>{ team.eliminated }</Table.Cell>
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