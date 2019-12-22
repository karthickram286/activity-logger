import React, { Component } from 'react';

class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value 
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const user = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        window.location = '/';
    }

    render() {
        return(
            <div>
                <p>CreateUser</p>
            </div>
        );
    }
}

export default CreateUser;