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
        case 'UPDATE_TEAM':            
            new_state.teams[action.data.index] = action.data;            
            return new_state;
        default:
            return state;
    }
};

export default TeamsReducer;