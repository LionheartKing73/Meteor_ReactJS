Mongo.Collection.prototype.helpers = function CollectionHelpers(helpers) {
  const self = this;

  if (self._transform && !self._helpers) {
    throw new Meteor.Error('400', `Não pode aplicar helpers em ${self._name} já existe uma função transform`);
  }

  if (!self._helpers) {
    self._helpers = function Document(doc) {
      return _.extend(this, doc);
    };
    self._transform = doc => new self._helpers(doc);
  }

  _.each(helpers, (helper, key) => {
    self._helpers.prototype[key] = helper;
  });
};
