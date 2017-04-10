Meteor.publish('carros', (query = {}, options = {}) => Carros.find(query, options));
