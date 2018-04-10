import React from 'react';
import Autosuggest from 'react-autosuggest';
import Auth from '../../modules/Auth';

class Autosuggestor extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      users: [],
      suggestions: [],
      value: ''
    }

    this.users = this.props.users.map((user, i) => ({ user_id: user._id, user_name: user.name, user_index: i }));

    this.changeHandler = this.changeHandler.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  componentDidMount(){
    this.setState({ users: this.users })
  }

  getSuggestions(value){
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0){
      var newState = []
    }
    else {
      var newState = []
      this.state.users.forEach((user) => {
        if(user.user_name.toLowerCase().slice(0, inputLength) === inputValue){
          newState.push(user)
        }
      })
    }
    return newState
  }

  getSuggestionValue(suggestion){
    return suggestion.user_name
  }

  renderSuggestion(suggestion){
    return( <span>{suggestion.user_name} </span>)
  }

  changeHandler( event, { newValue } ){
    this.setState({ value: newValue })
    this.props.recipCatcher(newValue)
  }

  onSuggestionsFetchRequested({ value }){
    this.setState({ suggestions: this.getSuggestions( value ) })
  }

  onSuggestionsClearRequested(){
    this.setState({ suggestions: [] })
  }

  render(){
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: ' send this to... ',
      value,
      onChange: this.changeHandler
    };

    return(
      <Autosuggest
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default Autosuggestor;
