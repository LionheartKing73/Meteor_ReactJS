const _createInitialGroups = (name, key) => ({
  parentId: null,
  editable: (name != 'Não classificados'), 	// Can create subgroups
  isDefault: (name == 'Não classificados'), // Default group for all customers
  slug: defaultSlugs[key] || '',						// Group Icon image
  name,
});

const defaultGroups = ['Não classificados', 'Família', 'Trabalho', 'Faculdade', 'Amigos', 'Lazer'];
const defaultSlugs = ['nc', 'familia', 'trabalho', 'faculdade', 'amigos', 'lazer'];

Meteor.methods({
  'groups.createInitial': function () {
    Groups.remove({});
    if (!Groups.findOne()) {
      console.log('Creating initial groups');
      Array(...defaultGroups).map((name, key) => {
        const group = _createInitialGroups(name, key);
        Groups.insert(group);
      });
    }
  },
});

if (!Groups.findOne()) {
  Meteor.call('groups.createInitial');
}
