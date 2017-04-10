Meteor.publish('argumentacoes', (query = {}, opts = {}) => Argumentacoes.find(query, opts));
