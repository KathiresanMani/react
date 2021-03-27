export default function AppReducer(state, action) {
    switch (action.type) {
        case 'LIST_PROPERTIES':
            return Object.assign([], state, action.payload);

        default:
            return state;
    }
}