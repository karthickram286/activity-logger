import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import 'react-datepicker/dist/react-datepicker.css';

class EditExercise extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/exercises/getExercise/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    username: res.data.userName,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                });
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('http://localhost:5000/users/getAllUsers')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.userName),
                    })
                }
            });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value 
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        })
    }

    onSubmit(e) {
        e.preventDefault();
        
        const exercise = {
            userName: this.state.username, 
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);  
        console.log(this.props.match.params.id);
        fetch('http://localhost:5000/exercises/updateExercise/' + this.props.match.params.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(exercise)
        }).then(res => console.log(res.data))
        .catch((err) => {
            console.log(err);
        });
        // axios.put('http://localhost:5000/exercises/updateExercise/' + this.props.match.params.id, exercise)
        //     .then(res => console.log(res.data))
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // window.location = '/';
    }

    render() {
        return(
            <div>
                <h3>Edit Exercise</h3>
                <form onSubmit = { this.onSubmit }>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput" 
                            required
                            className="form-control"
                            value = { this.state.username }
                            onChange = { this.onChangeUsername }>
                            {
                                this.state.users.map((user) => {
                                    return (
                                        <option
                                        key = { user }
                                        value = { user }>
                                            { user }
                                        </option>
                                    );          
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value = { this.state.description }
                            onChange = { this.onChangeDescription }
                        />
                    </div>

                    <div className="form-group">
                        <label>Duration (in minutes)</label>
                        <input type="text"
                            className="form-control"
                            value = { this.state.duration }
                            onChange = { this.onChangeDuration }
                        />
                    </div>

                    <div>
                        <DatePicker
                            selected = { this.state.date }
                            onChange = { this.onChangeDate }
                        />
                    </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Edit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditExercise;