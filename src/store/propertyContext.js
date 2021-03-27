import { createContext, useEffect, useReducer } from 'react';
import AppReducer from './reducer';

const initialState = [];

export const PropertiesContext = createContext(initialState);

export const PropertiesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        async function getProperties() {
            await fetch('https://carolineolds-strapi-dev.q.starberry.com/properties?_limit=50').then(res => res.json()).then(
                (result) => {
                    dispatch({ type: 'LIST_PROPERTIES', payload: result });
                },
                (error) => {
                    console.log('error');
                }
            )
        }

        getProperties();
    }, []);

    return <PropertiesContext.Provider value={state}>
        {children}
    </PropertiesContext.Provider>
}