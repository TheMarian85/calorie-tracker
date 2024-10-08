import { Activity, ActivityState } from "../../types"

export type ActivityActions = 
    {type: 'save-activity', payLoad: {newActivity : Activity}} |
    {type: 'set-activeId', payLoad: {id : Activity['id']}} |
    {type: 'delete-activity', payLoad: {id : Activity['id']}} |
    {type: 'restart-app'} 


const localStorageActivities = ():Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState : ActivityState = {
    activities : localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if(action.type === 'save-activity') {
        //Este código maneja la lógica para actualizar el state
        let updatedActivities : Activity[] = []
        if(state.activeId){
            updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payLoad.newActivity : activity)
        } else {
            updatedActivities= [...state.activities, action.payLoad.newActivity]
        }
        return {
            ...state,
            activities: updatedActivities,
            activeId: ''
        }
    }
    if(action.type === 'set-activeId'){
        return {
            ...state,
            activeId: action.payLoad.id
        }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payLoad.id)
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}