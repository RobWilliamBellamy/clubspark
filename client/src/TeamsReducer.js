// Teams reducer, react to actions and modify state.
const TeamsReducer = (state, action) => {

    let new_state = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case 'INIT_TEAMS': 
            new_state.teams = action.data;
            return new_state;
        case 'INIT_COUNTRIES':
            new_state.countries = action.data;
            return new_state;
        case 'SAVE_TEAM':                        
            return onSave(new_state, action.data);            
        default:
            return state;
    }
};

// Save a team update.
const onSave = (new_state, data) => {

    new_state.teams[data.index] = data; 
    return new_state;
};

export default TeamsReducer;