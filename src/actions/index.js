import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS} from '../constants';

export const addReminder = (text, dueDate, alert) => {

    const action = {
        type: ADD_REMINDER,
        text,
        dueDate,
        alert
    }
    console.log('action', action);
    return action;
};

export const deleteReminder =(id) => {
    const action = {
        type: DELETE_REMINDER,
        id
    }
    console.log('deleting in actions', action);
    return action;
}

export const clearReminders = () => {
    return {
        type:CLEAR_REMINDERS
    }
}