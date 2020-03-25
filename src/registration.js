import React from "react";

export class Registration extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fields: {
            username:{
              value:'',
              validation: [],
              required: true,
              checkLength: true,
              minLength: 3,
              maxLength: 15
            },
            email:{
              value:'',
              validation: [],
              required: true,
              checkEmail: true,
            },
            password:{
                value:'',
                validation: [],
                required: true,
                checkLength: true,
                minLength: 6,
                maxLength: 25,
                checkMatch: true,
                matchField: 'confirmPassword'
            },
            confirmPassword:{
                value:'',
                validation: [],
                required: true,
                checkLength: true,
                minLength: 6,
                maxLength: 25,
                checkMatch: true,
                matchField: 'password'
            },
        },
        isRegistered: false
      };
    }

    render() {
        const handleFieldChange = name => event => {
            this.setState({
                fields: {
                    ...this.state.fields,
                    [name]: {
                        ...this.state.fields[name],
                        value: event.target.value,
                        validation: [],
                    }
                }
            
            });
        };

        const submitForm = () => {
            const validationCheck = fieldsValidation();
            if(validationCheck.status){
                this.setState({isRegistered: true});

            }
            else{ this.setState({fields: validationCheck.fields}); }
        }

        const fieldsValidation = () => {
            const isValid = [];
            const checkedField = [];
            const fields = this.state.fields;
            Object.keys(this.state.fields).forEach(el => {
                const validationErr = [];
                //required
                if(fields[el].required && fields[el].value === '') {validationErr.push('required')}
                //check Email
                const emailPattern = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(fields[el].checkEmail) { 
                    if(!emailPattern.test(fields[el].value.toString().trim())) { validationErr.push('email')}
                }
                //check Length
                if(fields[el].checkLength) { 
                    if(fields[el].value.length < fields[el].minLength) { validationErr.push('minLength') }
                    else if(fields[el].value.length > fields[el].maxLength) { validationErr.push('maxLength') }
                }
                //check Match
                if(fields[el].checkMatch) { 
                    if(fields[el].value !== fields[fields[el].matchField].value){ validationErr.push('notMatch') }
                }
            
                isValid.push(validationErr.length > 0 ? false : true);
                const field = {
                    ...fields[el],
                    value: fields[el].value, 
                    validation: validationErr,
                };
                Object.assign(checkedField, {[el]: field});
            });
            return({
                status: isValid.includes(false) ? false : true,
                fields: checkedField
            });
        }

        const validationError = (name, field) => {
            switch (field.validation[0]) {
                case 'required':
                    return `${name} is required`;
                case 'email':
                    return 'Email is not valid';
                case 'minLength':
                    return `${name} must be at least ${field.minLength} characters`;
                case 'maxLength':
                    return `${name} must be less than ${field.maxLength} characters`;
                case 'notMatch':
                    return `${name} do not match with ${field.matchField}`;
                default:
                    return '';
            }
        }


        return (
        <div className="container">
        {!this.state.isRegistered ?
                <div className="form">
                <h2>Register With Us</h2>
                    <div className={`form-control ${this.state.fields.username.validation.length > 0 ? 'error' : ''}`}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={this.state.fields.username.value}
                        onChange={handleFieldChange('username')}
                        placeholder="Enter username" />
                    <small>{this.state.fields.username.validation.length > 0 ? validationError('username', this.state.fields.username) : ''}</small>
                    </div>
                    <div className={`form-control ${this.state.fields.email.validation.length > 0 ? 'error' : ''}`}>
                    <label>Email</label>
                    <input
                        type="text"
                        value={this.state.fields.email.value}
                        onChange={handleFieldChange('email')}
                        placeholder="Enter email" />
                    <small>{this.state.fields.email.validation.length > 0 ? validationError('email', this.state.fields.email) : ''}</small>
                    </div>
                    <div className={`form-control ${this.state.fields.password.validation.length > 0 ? 'error' : ''}`}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={this.state.fields.password.value}
                        onChange={handleFieldChange('password')}
                        placeholder="Enter password" />
                    <small>{this.state.fields.password.validation.length > 0 ? validationError('password', this.state.fields.password) : ''}</small>
                    </div>
                    <div className={`form-control ${this.state.fields.confirmPassword.validation.length > 0 ? 'error' : ''}`}>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={this.state.fields.confirmPassword.value}
                        onChange={handleFieldChange('confirmPassword')}
                        placeholder="Enter password again"
                    />
                    <small>{this.state.fields.confirmPassword.validation.length > 0 ? validationError('confirmPassword', this.state.fields.confirmPassword) : ''}</small>
                    </div>
                    <button onClick={submitForm}>Submit</button>
                </div>
        : 
        <div className="form">
            <h3>welcome, {this.state.fields.username.value}</h3>
        </div>
        }
        </div>
        );
    }
  }