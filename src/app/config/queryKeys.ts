const userKeys = {
  all: ['users'],
  me: ['users', 'me']
}


const accountKeys = {
  all: ['accounts'],
  create: ['accounts', 'create'],
  update: ['accounts', 'update'],
  delete: ['accounts', 'delete'],
}

const categoryKeys = {
  all: ['category']
}

const transactionKeys = {
  all: ['transaction'],
  create: ['transaction', 'create'],
  update: ['transaction', 'update'],
}
export {
  accountKeys, categoryKeys, transactionKeys, userKeys
}

