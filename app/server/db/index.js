import pg from 'pg'
import Promise from 'promise'

const DEBUG = process.env.NODE_ENV !== 'production'
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/lifty'
const client = new pg.Client(connectionString)

client.connect()

function setup() {
  const promises = [
    query("DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public; COMMENT ON SCHEMA public IS 'standard public schema'"),
    query("CREATE TABLE users(id SERIAL PRIMARY KEY not null, email TEXT not null, first_name TEXT, last_name TEXT, age INTEGER, weight INTEGER, body_fat REAL, password TEXT not null)"),
    query("CREATE TABLE workouts(id SERIAL PRIMARY KEY not null, user_id INTEGER references users(id))"),
    query("CREATE TABLE sets(id SERIAL PRIMARY KEY not null, user_id INTEGER references users(id), workout_id INTEGER references workouts(id), weight INTEGER, reps INTEGER, type TEXT, exercise TEXT)"),
    query("CREATE TABLE sessions(id SERIAL PRIMARY KEY not null, user_id INTEGER references users(id))")
  ]

  return Promise.all(promises)
    .then(() => {
      console.log('tables successfully created')
    })
}

function seed() {
  const promises = [
    query("INSERT INTO users(email, first_name, last_name, age, weight, body_fat, password) values($1, $2, $3, $4, $5, $6, $7)",
      ['jon.rogozen@gmail.com', 'jon', 'rogozen', 26, 168, 17, 'password1']),
    query("INSERT INTO users(email, first_name, last_name, age, weight, body_fat, password) values($1, $2, $3, $4, $5, $6, $7)",
      ['test@gmail.com', 'test', 'user', 27, 150, 12, 'password1']),
    query("INSERT INTO workouts(user_id) values(1), (1), (2)"),
    query(`INSERT INTO sets(user_id, workout_id, weight, reps, type, exercise) values
      (1, 1, 225, 5, 'main', 'bench press'),
      (1, 1, 135, 3, 'warmup', 'bench press'),
      (1, 1, 335, 1, 'main', 'deadlift'),
      (1, 2, 400, 1, 'main', 'squat'),
      (2, 3, 85, 10, 'warmup', 'press')
    `)
  ]

  Promise.all(promises)
    .then(() => {
      console.log('data successfully seeded')
    })
}

if (DEBUG) {
  setup().then(() => seed())
}

function query(sql, values) {
  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) {
        console.log('err', err)
        reject(err)
      }

      return resolve(result)
    })
  })
}

export { query }