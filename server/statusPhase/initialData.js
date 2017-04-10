import React, { Component } from 'react';
import StatusPhase from '../../lib/collections/statusPhase';

Meteor.methods({

  /**
   * @memberOf StatusPhase
   * @name createFake
   * @summary Inserts initial data for the collection
   */
  'statusPhase.createAll': function () {
    StatusPhase.insert({

      phase: 'Novo Negócio',
      status: [

        'Não consegui contato',
        'Não pode falar no momento',
        'Pendente de informação',
        'Telefone incorreto',
        'Telefone inexistente',
        'Cliente fechou com congênere',
        'Cliente não possui veículo',
        'Cliente possui seguro na congênere',
        'Cliente possui seguro Porto, Itaú, Azul',
        'Não tem interesse no produto'
      ]

    });

    StatusPhase.insert({

      phase: 'Negociação',
      status: [

        'Não consegui contato',
        'Não pode falar no momento',
        'Avaliação da cotação pelo cliente',
        'Insatisfeito com o preço',
        'Insatisfeito com o produto',
        'Cliente fechou com congênere',
        'Não tem interesse no produto'
      ],

    });

    StatusPhase.insert({

      phase: 'Proposta',
      status: [

        'Não consegui contato',
        'Não pode falar no momento',
        'Pendente de informação',
        'Insatisfeito com o preço',
        'Insatisfeito com o produto',
        'Cliente fechou com congênere'
      ],

    });

    StatusPhase.insert({

      phase: 'Transmitida',
      status: [

        'Aguardando emissão Porto Seguro',
        'Aguardando Emissão Itaú',
        'Aguardando emissão Azul Seguros',
        'Aguardando emissão Congênere 1',
        'Aguardando emissão Congênere 2'
      ],

    });

    StatusPhase.insert({

      phase: 'Emitida',
      status: [
        'Apólice/Contrato emitido(a)',
      ],

    });

    StatusPhase.insert({

      phase: 'Recusa',
      status: [

        'Recusa por dados incompletos',
        'Recusa por Vistoria Prévia',
        'Recusa por Documentos Reprovados',
        'Recusa por falta de pagamento',
        'Recusa técnica Proposta',
        'Recusa por prazo de emissão'
      ],

    });
  },
});

if (!StatusPhase.findOne()) {
  Meteor.call('statusPhase.createAll');
}
