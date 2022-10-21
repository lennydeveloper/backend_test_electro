import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import axios from 'axios';
// .env config
import dotenv from 'dotenv';
dotenv.config();

// import nodeFetch from 'node-fetch';

// import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
  fetch: nodeFetch,
});

const app = express();
app.use(cors());
app.use(express.json());

// Obtener las imágenes marcadas con un like
app.get('/api/user/likes', (req, res) => {
  axios.get(`${process.env.UNSPLASH_BASE_URL}/users/${process.env.UNSPLASH_USER}/likes?client_id=${process.env.ACCESS_KEY}`)
    .then(
      response => {
        res.status(200).send(response.data);
      }
    ).catch(err => {
      console.log(err);
      res.status(500).send();
    });
  return
});

// Buscar imágenes
app.get('/api/search/photos', (req, res) => {
  const word = req.query.search;
  unsplash.search.getPhotos({
    query: word,
    page: 1,
    perPage: 10
  }).then(data => {
    if (data.status === 200) {
      res.status(data.status).send(data.response);
    } else {
      res.status(data.status).send();
    }
  }).catch(err => {
    console.log(err);
    res.status(500).send();
  })
});

// generar like para una foto
app.post('/api/photos/like', (req, res) => {
  const body = req.body;
  const photo_id = body.id;
  const access_token = body.token;

  const axios_instance = axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  axios_instance.post(`${process.env.UNSPLASH_BASE_URL}/photos/${photo_id}/like/`)
    .then(response => {
      res.status(200).send(response.data);
    }).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
})

const port = process.env.PORT || 8080;

var server = app.listen(port, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;
});

export default app;