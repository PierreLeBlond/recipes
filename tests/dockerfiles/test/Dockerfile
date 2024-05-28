ARG NODE_VERSION=21.0.0
FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV="production"

FROM base as build

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

COPY ./package.json .
RUN npm install --prod=false

COPY --link . . 

RUN apt-get update -qq && \
  apt-get install --no-install-recommends -y build-essential openssl

RUN npx prisma generate

RUN npm run build

FROM base

COPY --from=build /build /build
COPY --from=build /prisma/schema.prisma schema.prisma
COPY --from=build /prisma/seed.cjs seed.cjs

CMD npm run db:push --skip-generate && npm run db:seed && npm run start


