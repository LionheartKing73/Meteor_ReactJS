Meteor.methods({
  'groups.create': function (parentId, brokerId, name) {
    const maxSubGroups = 3;
    const count = Groups.find({ parentId, brokerId }).count();
    if (count == maxSubGroups)			{ throw new Meteor.Error('400', `Máximo de (${maxSubGroups}) subgrupos já criados.`); }

    const group = {
      parentId,					// Parent group._id
      brokerId,					// User._id FIXME: Login Meteor.user
      editable: true, 	// Can create subgroups
      slug: 'custom',		// Group image
      name,
    };

    return Groups.insert(group);
  },
	/**
	 * Move costumers. De > Para
	 *
	 */
  'groups.moveCustomers': function (customerIds, newGroupId) {
    const oldGroup = (Customers.findOne(customerIds[0]) || []).groupId;
    if (Customers.update({ _id: { $in: customerIds } }, { $set: { groupId: newGroupId } }, { multi: (customerIds.length > 1) })) {
      if (Groups.update(newGroupId, { $push: { customers: { $each: customerIds } } })) {
        if (oldGroup) {
        	Groups.update(oldGroup, { $pull: { customers: { $in: customerIds } } });
        }
      }
      return true;
    }
  },
	/**
	 *	Delete Groups and move (Não classificados) customers
	 */
  'groups.delete': function (groupId) {
		// TODO: Check user permission
    Customers.update({ groupId }, {$unset: {groupId: ''}}, {multi: true});
    return Groups.remove({ _id: groupId });
  },
});
