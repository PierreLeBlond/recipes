# Recipe

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## dev

`pnpm run i`

### db

To sync db with prisma schema, and generate files :

`pnpm run db:push`

To seed the db with testing values :

`pnpm run db:seed`

Each time you update the schema :

`npx prisma migrate dev --name <update-name>`

### run

`pnpm run dev`

### Testing

Unit & integration tests (vitest)

`pnpm run test`
