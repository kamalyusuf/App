FROM node as build

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .
COPY packages/water ./packages/water
COPY packages/plantain ./packages/plantain

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /usr/app/packages/water
RUN yarn build

WORKDIR /usr/app/packages/plantain
RUN yarn build

FROM node

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

COPY --from=build /usr/app/packages/water/package.json /usr/app/packages/water/package.json
COPY --from=build /usr/app/packages/water/dist /usr/app/packages/water/dist

COPY --from=build /usr/app/packages/plantain/package.json /usr/app/packages/plantain/package.json
COPY --from=build /usr/app/packages/plantain/dist /usr/app/packages/plantain/dist
COPY --from=build /usr/app/packages/plantain/.env.production /usr/app/packages/plantain/.env
COPY --from=build /usr/app/packages/plantain/.env.example /usr/app/packages/plantain/.env.example

ENV NODE_ENV production

RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /usr/app/packages/plantain

CMD ["node", "dist/index.js"]