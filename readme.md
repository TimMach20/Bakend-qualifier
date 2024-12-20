# HOW TO RUN

To initializate should be run _**docker**_ on your machine

```bash
npm install --legacy-peer-deps
npm run docker:dev  # Initializes the server in development mode
npm run docker:prod  # Initializes the server in production mode
npm run docker:down # Down all running docker containers
```

# HOW TO ADD MIGRATIONS

To add migrations you must run `npm run docker:dev`, make the respective modifications in `schema.prisma` and whitin the **app_dev** container run `npx prisma migrate dev --name <name_migration>`
