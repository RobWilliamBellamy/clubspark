import { useContext, useState } from 'react';
import { Table, Image, Form, Input, Button, Icon, Modal, Header } from 'semantic-ui-react';
import { AppContext } from './App';

import './css/Team.css';

/**
 * Team.
 * @param {*} props 
 * @returns 
 */
const Team = (props) => {

    // Use context to dispatch state updates.
    const [ state, dispatch ] = useContext(AppContext); 
    
    // Declate local state for team fields we wish to edit.
    const team = props.location.state.team;  
    const [ index ] = useState(props.location.state.index);
    const [ id ] = useState(team.id);
    const [ name, setName ] = useState(team.name);
    const [ country, setCountry ] = useState(team.country);
    const [ eliminated, setEliminated ] = useState(team.eliminated === 'true');
    const [ save, setSave ] = useState(false);
    
    const team_img = `http://img.uefa.com/imgml/TP/teams/logos/70x70/${id}.png`;
    const team_page = `https://www.uefa.com/teamsandplayers/teams/club=${id}/profile/index.html`;        

    // Save state changes, redirect to home page.
    const onSave = () => {

        dispatch({ type: 'SAVE_TEAM', data: {
            index: index,
            id: id, 
            name: name,
            country: country,
            eliminated: eliminated.toString(),
        }});

        setSave(false);
        props.history.push(`/teams/${index}`);
    };

    // Back to teams.
    const onBack = () => {
        props.history.push(`/teams/${index}`);
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
                <h1><Image size='mini' src={ team_img } verticalAlign='top' />
                    <span>&nbsp;Team Detail Page</span>
                </h1>
                <p>Click <a href={ team_page } 
                            target='_blank' 
                            rel="noreferrer">here</a> for the official UEFA team page.</p>
                
                <Modal basic
                       onClose={() => setSave(false)}
                       onOpen={() => setSave(true)}
                       open={save}
                       size='small'>
                    <Header icon>
                        <Icon name='save' />
                        Confirm Save Changes
                    </Header>
                    <Modal.Content>
                        <p>
                        Are you sure you wish to commit your changes to the team data?
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setSave(false)}>
                        <Icon name='remove' /> No
                        </Button>
                        <Button color='green' inverted onClick={() => onSave()}>
                        <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
                
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
                            <Table.Cell>{ id }</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Name</Table.Cell>                            
                            <Table.Cell>
                                <Form.Field control={Input}
                                            value={ name }
                                            placeholder='Team Name'
                                            onChange={ (event, field) => setName(field.value) }
                                />                               
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Country</Table.Cell>
                            <Table.Cell>
                                <Form.Select options={ country_options }
                                            placeholder="Available Countries"
                                            value={ country }                             
                                            onChange={ (event, field) => setCountry(field.value) }
                                            search
                                />   
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Eliminated</Table.Cell>
                            <Table.Cell>
                                <Form.Group>
                                    <Form.Checkbox key={ `check_box_${name}` } 
                                                defaultChecked={ eliminated } 
                                                onChange={ (event, data) => setEliminated(data.checked) } />
                                </Form.Group>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Button.Group floated='left'>
                                    <Button name="back"
                                            onClick={ () => onBack() }>Back</Button>
                                    <Button.Or />
                                    <Button name="save"                                            
                                            color="blue"
                                            icon
                                            labelPosition="right"
                                            size="small"
                                            positive
                                            onClick={ () => setSave(true) }>
                                        Save<Icon name='save' />
                                    </Button>     
                                </Button.Group>               
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>);
};

export default Team;