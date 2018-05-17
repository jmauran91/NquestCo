import React from 'react';
import Autosuggest from 'react-autosuggest';
import Auth from '../../modules/Auth';
import Convert from '../../modules/Convert';

class Autosuggestor extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      users: [],
      suggestions: [],
      value: ''
    }



    this.changeHandler = this.changeHandler.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(!Convert.isArrEmpty(nextProps.users)){
      var eat_this = nextProps.users.map((user, i) => ({ user_id: user._id, user_name: user.firstName + " " + user.lastName, user_index: i }));
      this.setState({ users: eat_this })
    }
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

  onSuggestionSelected() {
    this.setState({ value: '' })
  };

  getSuggestionValue(suggestion){
    return suggestion.user_name
  }

  renderSuggestion(suggestion){
    return( <span> {suggestion.user_name} </span>)
  }

  changeHandler( event, { newValue, method } ){
    if (method === 'enter') return;
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
      placeholder: '.. type user ..',
      value,
      onChange: this.changeHandler
    };

    return(
      <Autosuggest
        ref="autosuggest"
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    )
  }
}

export default Autosuggestor;
