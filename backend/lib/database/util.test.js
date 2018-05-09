const { pool, createMultiStatementConnection } = require('./index')
const {
  clearDatabaseAndImportTestDump, clearDatabase, readDbSchema, useConnection,
} = require('./util')
const { createMockDatabase, dropMockDatabase, getDatabaseName } = require('./mock')

const users = [
  ['David', 'Nadoba'],
  ['Sebastian', 'Vogt'],
  ['Ferhat', 'Ayaydin'],
  ['Marc', 'Mehrer'],
  ['Fabian', 'Munzinger'],
]

async function createUsers() {
  await pool.query('INSERT INTO user (first_name, last_name) VALUES ?', [users])
}

async function getUserCount() {
  const [results] = await pool.query('SELECT COUNT(*) as count FROM user')
  const [result] = results
  return result.count
}

describe('clear database and import test dump', () => {
  beforeEach(createMockDatabase)
  afterEach(dropMockDatabase)
  it('should drop the database and import the schema', async () => {
    expect(await getUserCount()).toEqual(0)
    await createUsers()
    expect(await getUserCount()).toEqual(users.length)

    const connPromise = createMultiStatementConnection(true)
    await useConnection(connPromise, async (conn) => {
      await clearDatabase(conn, await readDbSchema(), getDatabaseName())
    })

    expect(await getUserCount()).toEqual(0)
  })

  it('should drop the database, import the schema and the test data', async () => {
    await createUsers()

    expect(await getUserCount()).toEqual(users.length)

    await clearDatabaseAndImportTestDump(getDatabaseName())

    expect(await getUserCount()).toEqual(7)
  })
})
