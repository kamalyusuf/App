FROM node as build

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/water ./packages/water
COPY packages/shawarma ./packages/shawarma

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/app/packages/water
RUN yarn build

WORKDIR /usr/app/packages/shawarma
RUN yarn build

FROM node

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/app/packages/water/package.json /usr/app/packages/water/package.json
COPY --from=build /usr/app/packages/water/dist /usr/app/packages/water/dist

COPY --from=build /usr/app/packages/shawarma/package.json /usr/app/packages/shawarma/package.json
COPY --from=build /usr/app/packages/shawarma/dist /usr/app/packages/shawarma/dist
COPY --from=build /usr/app/packages/shawarma/.env.production /usr/app/packages/shawarma/.env
COPY --from=build /usr/app/packages/shawarma/.env.example /usr/app/packages/shawarma/.env.example

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

EXPOSE 1337

WORKDIR /usr/app/packages/shawarma

CMD ["node", "dist/index.js"]