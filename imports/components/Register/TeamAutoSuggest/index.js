import React from 'react';
import Autosuggest from 'react-autosuggest';

const CONST_TIMES_NAME = [
  { name: 'América-MG' },
  { name: 'Atlético-GO' },
  { name: 'Atlético-MG' },
  { name: 'Atlético-PR' },
  { name: 'Avaí' },
  { name: 'Bahia' },
  { name: 'Botafogo' },
  { name: 'Chapecoense' },
  { name: 'Corinthians' },
  { name: 'Coritiba' },
  { name: 'Cruzeiro' },
  { name: 'Figueirense' },
  { name: 'Flamengo' },
  { name: 'Fluminense' },
  { name: 'Grêmio' },
  { name: 'Internacional' },
  { name: 'Palmeiras' },
  { name: 'Ponte Preta' },
  { name: 'Santa Cruz' },
  { name: 'Santos' },
  { name: 'São Paulo' },
  { name: 'Sport' },
  { name: 'Vasco' },
  { name: 'Vitória' }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  return CONST_TIMES_NAME.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class TeamAutoSuggest extends React.Component {

 constructor() {
    super();
    this.state = {
      value: '',
      suggestions: []
    };
  }

 onChange(event, { newValue, method }){
    this.setState({
      value: newValue
    });
  };

 onSuggestionsFetchRequested({ value }){
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

 onSuggestionsClearRequested(){
    this.setState({
      suggestions: []
    });
  };

 render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Informe o seu time aqui ;D",
      value,
      onChange: this.onChange
    };
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
    );
  }
}

export default TeamAutoSuggest;