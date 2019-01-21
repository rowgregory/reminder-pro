import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
import moment from 'moment';
import '../index.css';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            dueDate:'',
            alert:false
        }
    }

    addReminder(){
       
        console.log('dueDate', this.state.dueDate)
        this.props.addReminder(this.state.text, this.state.dueDate, this.state.alert);
        

        this.setState({
            text: '',
            dueDate:''
        })
    }

    deleteReminder(id){
        console.log('deleting in application', id);
        console.log('this.props', this.props);
        this.props.deleteReminder(id);
    }

    renderReminders(){
        const { reminders } = this.props;
        
        return (
            <ul className="list-group col-sm-4">
                { reminders.map(reminder => {
                    return(
                        <li 
                            key={ reminder.id }
                            className="list-group-item">
                            <div 
                                className="list-item delete-button"
                                onClick={() => this.deleteReminder(reminder.id)}
                                >
                                &#x2715;
                            </div> 
                            <div className="list-item">
                                    <div className="reminder-text">{ reminder.text }</div> 
                                    
                                   
                                    <div>
                                        { this.state.alert === moment(reminder.dueDate).isAfter()
                                            ? <div className="alert">This reminder passed {moment(new Date(reminder.dueDate)).fromNow() }</div>
                                            : <div className="alert2"><em> {moment(new Date(reminder.dueDate)).fromNow() }</em></div>
                                        }
                                    </div>
                                                                
                            </div>
                            {/* <div className="alert2"><em> {moment(new Date(reminder.dueDate)).fromNow() }</em></div> */}
                            
                        </li>
                    )
                })}
            </ul>
        )
    }

    render(){
        return(
            <div className="App">
                <div className="title">
                    Reminder Pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input
                            className="form-control"
                            placeholder="I have to..."
                            onChange={ event => this.setState({text: event.target.value})}
                            value={this.state.text}
                            onKeyPress={event => {
                                if(event.key === 'Enter'){ 
                                    console.log('Enter key', event.key);
                                    this.addReminder() 
                                }   
                            }}
                        />
                        <input 
                            className="form-control"
                            type="datetime-local"
                            onChange={event => this.setState({dueDate:event.target.value})}
                            value={this.state.dueDate}
                            onKeyPress={event => {
                                if(event.key === 'Enter'){ 
                                    console.log('Enter key', event.key);
                                    this.addReminder() 
                                }   
                            }}
                        />
                    </div> 
                   
                    <button 
                        type="button"
                        className = "btn btn-success"
                        onClick={() => this.addReminder()}
                    >
                        Add Reminder
                    </button>
                </div>
                { this.renderReminders() }
                <div 
                    className="btn btn-danger"
                    onClick={() => this.props.clearReminders() }
                >
                Clear Reminders
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        reminders: state
    }
}

export default connect(mapStateToProps, {addReminder, deleteReminder, clearReminders} )(App);