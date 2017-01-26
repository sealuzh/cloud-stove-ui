FROM node:6.6.0

RUN mkdir /app
WORKDIR app

ADD package.json /app/package.json
RUN npm install

COPY . /app/

ENV API_URL api.thestove.io
ENV PORT 80

RUN npm run build
EXPOSE 80

CMD ["npm", "run", "production"]