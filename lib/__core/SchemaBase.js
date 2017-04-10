import './Schemas';

/**
 * https://github.com/aldeed/meteor-collection2#autoValue
 */
global.SchemaBase = {
  "registrationIsComplete": {
    type: Boolean,
    optional: true,
  },
  "_id": {
    type: String,
    optional: true,
  },
  "name": {
    type: String,
    label: 'Nome',
    min: 2,
    max: 100,
    optional: true,
  },
  "workingClientID": {
    type: String,
    optional: true,
    label: 'Cliente usado para o CRUD', // create update...
  },
  "createdBy": {
    type: String,
    optional: true,
    autoValue() {
      if (this.isInsert) return this.userId;
      // return this.unset();
    },
  },
  "createdAt": {
    optional: true,
    type: Date,
    label: 'Data de Criação',
    autoValue() {
      if (this.isInsert || this.isSet) {
        return new Date();
      }
      if (this.isUpsert) {
        return {
          $setOnInsert: new Date(),
        };
      }
    },
  },
  "updatedAt": {
    optional: true,
    type: Date,
    label: 'Última alteração',
    autoValue() {
      return new Date();
    },
  },
  "updatesHistory": {
    type: Array,
    optional: true,
    // autoValue() {
    //   if (this.isUpdate || this.isUpsert) {
    //     return {
    //       $push: {
    //         date: new Date(),
    //         userId: this.userId,
    //         isUpdate: this.isUpdate,
    //         isUpsert: this.isUpsert,
    //       },
    //     };
    //   }
    //   // return this.unset();
    // },
  },
  'updatesHistory.$': {
    type: Object,
  },
  'updatesHistory.$.date': {
    type: Date,
    optional: true,
  },
  'updatesHistory.$.userId': {
    type: String,
    optional: true,
  },
  'updatesHistory.$.isUpdate': {
    type: Boolean,
    optional: true,
  },
  'updatesHistory.$.isUpsert': {
    type: Boolean,
    optional: true,
  },
  "active": {
    type: Boolean,
    optional: true,
  },
  "step": {
    type: Number,
    max: 1000,
    label: 'Step',
    optional: true,
  },
};

export default SchemaBase;
