import uuid from 'uuid/v1';
import { normalize, schema } from 'normalizr';

const baseData = [
  {
    id: uuid(),
    name: 'TODO',
    cards: [],
    // cards: [
    //   {
    //     id: uuid(),
    //     name: 'card Todo',
    //     description: 'description',
    //     comments: [],
    //     user: {
    //       id: uuid(),
    //       fullName: '',
    //       avatarUrl: 'www.google.com',
    //     },
    //   },
    // ],
  },
  {
    id: uuid(),
    name: 'In Progress',
    cards: [],
  },
  {
    id: uuid(),
    name: 'Testing',
    cards: [],
  },
  {
    id: uuid(),
    name: 'Done',
    cards: [],
  },
];

const user = new schema.Entity('users');

const comment = new schema.Entity('comments', {
  user: user,
});

const card = new schema.Entity('cards', {
  comments: [comment],
  user: user,
});

const column = new schema.Entity('columns', {
  cards: [card],
});

const columns = new schema.Array(column);

export default (database = null) => {
  try {
      //console.log('baseData ', baseData);
      const normalizedData = normalize(baseData, columns);
   //   console.log('normalizedData ', normalizedData);
      const data = {
        columnsIds: database.columnsIds || normalizedData.result,
        columns: database.columns || normalizedData.entities.columns,
        cards: database.cards || normalizedData.entities.cards || {},
        comments: database.comments || normalizedData.entities.comments || {},
        users: database.users || normalizedData.entities.users || {},
        currentUser: database.currentUser || normalizedData.entities.currentUser || {},
      }
   //   console.log('data ', data);
      return data
  } catch(err) {
    console.log(err.message);
    throw new Error(err);
  }
};
