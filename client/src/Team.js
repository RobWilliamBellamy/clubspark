import { useContext, useState, useEffect } from 'react';
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
    const [ id, setId ] = useState(0);
    const [ name, setName ] = useState('');
    const [ country, setCountry ] = useState('');
    const [ eliminated, setEliminated ] = useState(false);
    const [ save, setSave ] = useState(false);
    
    // Set initial values.
    useEffect(() => {

        const team = props.location.state.team;
        setId(team.id);
        setName(team.name);
        setCountry(team.country);
        setEliminated(team.eliminated);

    }, []);
    
    const team_img = 'http://img.uefa.com/imgml/TP/teams/logos/70x70/' + id + '.png';
    const team_page = `https://www.uefa.com/teamsandplayers/teams/club=${id}/profile/index.html`;        

    // Open official team UEFA page.
    const openLink = (e) => {
        window.open(team_page, '_blank');
    };

    // Save state changes, redirect to home page.
    const onSave = () => {

        dispatch({ type: 'SAVE_TEAM', data: {
            id: id, 
            name: name,
            country: country,
            eliminated: eliminated,
        }});

        setSave(false);
        props.history.push('/');
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
                <p>Click <a onClick={ (e) => openLink(e) } >here</a> for the official UEFA team page.</p>
                
                <Modal basic
                       onClose={() => setSave(false)}
                       onOpen={() => setSave(true)}
                       open={save}
                       size='small'
                       trigger={<Button>Basic Modal</Button>}>
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
                                    <Form.Checkbox key={ 'check_box_' + name } 
                                                defaultChecked={ eliminated } 
                                                onChange={ (event, data) => setEliminated(data.checked) } />
                                </Form.Group>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='5'>
                                <Button name="save"
                                        floated='right'
                                        color="blue"
                                        icon
                                        labelPosition="right"
                                        size="small"
                                        onClick={ () => setSave(true) }>
                                    Save<Icon name='save' />
                                </Button>                    
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>);
};

export default Team;