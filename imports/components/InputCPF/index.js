import React from 'react';

export default class InputCPF extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);

    this.state = {
      cpf: '',
    };
  }

  componentDidMount() {
    // invoked once (client-only), after initial 'render'
    // good for AJAX, setTimeout, setInterval
  }

  componentDidUpdate(prevProps, prevState) {
    // invoked immediately after DOM updates, not for initial 'render'
  }

  _onChange(ev) {
    const cpf = ev.target.value;
    console.log(`_onChange(ev) - CPF: ${cpf}`);

    // TODO: validar CPF

    this.setState({ cpf });
  }

  render() {
    const { cpf } = this.state;
    console.log(`render() - CPF: ${cpf}`);

    return (
      <input onChange={this._onChange} value={cpf} />
    );
  }

  componentWillUnmount() {
    // invoked immediately before a component is unmounted from the DOM
  }
}
