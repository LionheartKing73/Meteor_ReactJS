import React, { Component } from 'react';

class AdminCorretorNew extends Component {

  constructor(props) {
    super(props);

    this.state = {
      filterText: "",
      products: [
        {
          id: 1,
          nome: 'Leao',
          email: 'leao@gmail.com',
          telefone: '(11) 4748-0989',
          cpf: '226.272.282-02'
        }, {
          id: 2,
          nome: 'Nardo',
          email: 'nardo@gmail.com',
          telefone: '(11) 4742-1989',
          cpf: '456.372.382-12'
        },
      ],
    };
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };

  handleRowDel(product) {
    var index = this.state.products.indexOf(product);
    this.state.products.splice(index, 1);
    this.setState(this.state.products);
  };

  handleAddEvent(evt) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      id: id,
      nome: "",
      price: "",
      category: "",
      qty: ""
    };
    this.state.products.push(product);
    this.setState(this.state.products);
  }

  handleCorretorTable(evt) {
    var item = {
      id: evt.target.id,
      nome: evt.target.name,
      value: evt.target.value
    };
    var products = this.state.products.slice();
    var newProducts = products.map(function (product) {
      for (var key in product) {
        if (key == item.nome && product.id == item.id) {
          product[key] = item.value;
        }
      }
      return product;
    });
    this.setState({ products: newProducts });
  };

  render() {
    return (
      <div className="admin-cadastro-corretor">
        <h1 className="cadastro-titulo">Cadastro novo corretor</h1>
        <SearchBar filterText={this.state.filterText}
                   onUserInput={this.handleUserInput.bind(this)}
                   handleAddEvent={this.handleAddEvent.bind(this)}/>
        <CorretorTable
          onProductTableUpdate={this.handleCorretorTable.bind(this)}
          onRowDel={this.handleRowDel.bind(this)}
          products={this.state.products}
          filterText={this.state.filterText}/>
      </div>
    );
  }
}

class SearchBar extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }

  render() {
    return (
      <div className="admin-tabela-editavel-searchbox">
        <input type="text" placeholder="Search..." value={this.props.filterText}
               ref="filterTextInput" onChange={this.handleChange.bind(this)}/>
        <button type="button" onClick={this.props.handleAddEvent}
                className="admin-table-editavel-addbutton btn btn-success pull-right">
          Adicionar Corretor
        </button>
      </div>
    );
  }
}

class CorretorTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      products: this.props.products
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      products: nextProps.products
    })
  }

  render() {
    var onProductTableUpdate = this.props.onProductTableUpdate;
    var rowDel = this.props.onRowDel;
    var filterText = this.props.filterText;
    var product = this.state.products.map(function (product) {
      if (product.nome.indexOf(filterText) === -1) {
        return;
      }
      return (
        <CorretorRow onProductTableUpdate={onProductTableUpdate}
                     product={product} onDelEvent={rowDel.bind(this)}
                     key={product.id}/>
      )
    });
    return (
      <div className="admin-tabela-editavel-wrapper">
        <table className="table">
          <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Telefone</th>
            <th>CPF</th>
            <th></th>
            <th></th>
          </tr>
          </thead>

          <tbody>{product}</tbody>

        </table>
      </div>
    );
  }
}

class CorretorRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      product: this.props.product,
      edit: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      product: nextProps.product
    })
  }

  editHandle() {
    if (this.state.edit === true) {
      this.setState({ edit: false });
    }
    else {
      this.setState({ edit: true });
    }
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.product);
  }

  render() {

    return (
      <tr className="eachRow">
        <CorretorCell onProductTableUpdate={this.props.onProductTableUpdate}
                      product={this.state.product}
                      edit={this.state.edit}
                      cellData={{
                        type: "nome",
                        value: this.state.product.nome,
                        id: this.state.product.id
                      }}/>
        <CorretorCell onProductTableUpdate={this.props.onProductTableUpdate}
                      product={this.state.product}
                      edit={this.state.edit}
                      cellData={{
                        type: "email",
                        value: this.state.product.email,
                        id: this.state.product.id
                      }}/>
        <CorretorCell onProductTableUpdate={this.props.onProductTableUpdate}
                      product={this.state.product}
                      edit={this.state.edit}
                      cellData={{
                        type: "telefone",
                        value: this.state.product.telefone,
                        id: this.state.product.id
                      }}/>
        <CorretorCell onProductTableUpdate={this.props.onProductTableUpdate}
                      product={this.state.product}
                      edit={this.state.edit}
                      cellData={{
                        type: "cpf",
                        value: this.state.product.cpf,
                        id: this.state.product.id
                      }}/>
        <td>
          <button className="tabela-editar fa fa-pencil-square-o"
                  onClick={this.editHandle.bind(this)}/>
        </td>
        <td>
          <button className="tabela-apagar fa fa-trash"
                  onClick={this.onDelEvent.bind(this)}/>
        </td>
      </tr>
    );
  }
}

class CorretorCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellData: this.props.cellData,
      product: this.props.product,
      edit: this.props.edit
    };
  }

  componentWillReceiveProps(NextProps) {
    if (NextProps.cellData)
      this.setState({ cellData: NextProps.cellData });
    this.setState({ edit: NextProps.edit })
  }

  render() {
    if (this.state.edit === false) {
      return (
        <ReadCell onProductTableUpdate={this.props.onProductTableUpdate}
                  cellData={this.state.cellData}/>
      );
    }
    else {
      return (
        <EditCell onProductTableUpdate={this.props.onProductTableUpdate}
                  cellData={this.state.cellData}/>
      );
    }
  }
}

class ReadCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cellData: this.props.cellData
    };
  }

  componentWillReceiveProps(NextProps) {
    if (NextProps.cellData)
      this.setState({ cellData: NextProps.cellData })
  }

  render() {
    return (
      <td>{this.state.cellData.value}</td>
    );
  }
}

class EditCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cellData: this.props.cellData
    };
  }

  componentWillReceiveProps(NextProps) {
    if (NextProps.cellData)
      this.setState({ cellData: NextProps.cellData })
  }

  render() {
    return (
      <td>
        <input type='text' name={this.state.cellData.type}
               id={this.state.cellData.id}
               defaultValue={this.state.cellData.value}
               onChange={this.props.onProductTableUpdate}/>
      </td>
    );
  }
}

export default GLOBAL.createContainer((props) => {
  const subUser = GlobalSubsManager('user.selfProfile');
  return {
    user: Meteor.user() || {},
    loading: !subUser.ready(),
  };
}, AdminCorretorNew);
