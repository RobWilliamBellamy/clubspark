import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import { AppContext } from './App';

import './css/Teams.css';

const Teams = () => {

    // Use context to access state.
    const [ state ] = useContext(AppContext);     

    const renderTableContent = () => {

        let rows = [];
        state.teams.forEach((t, i) => {

            const link = { path: '/team/' + i };
            rows.push(
                <Table.Row key={ 'team' + i }>
                    <Table.Cell>{ t.id }</Table.Cell>                    
                    <Table.Cell>
                        <Link to={`/team/${ i }`}>
                            <button>
                                { t.name }
                            </button>
                        </Link>
                    </Table.Cell>
                    <Table.Cell>{ t.country }</Table.Cell>
                    <Table.Cell>{ t.eliminated }</Table.Cell>
                </Table.Row>
            )
        });

        return rows;
    }


    return (<div>  
                <h1>Teams Page</h1>
                <p>Select team name to edit the team.</p>
                <Table celled striped>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Country</Table.HeaderCell>
                        <Table.HeaderCell>Eliminated</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        { renderTableContent() }
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

export default Teams;