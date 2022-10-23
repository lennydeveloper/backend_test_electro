import express from 'express';
import cors from 'cors';
import _ from 'lodash';
import nodeFetch from 'node-fetch';
import { createApi } from 'unsplash-js';
import axios from 'axios';
// .env config
import dotenv from 'dotenv';
dotenv.config();

const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
  fetch: nodeFetch,
});

const app = express();
app.use(cors());
app.use(express.json());

// Obtener las imágenes marcadas con un like
app.get('/api/user/likes', (req, res) => {
  axios.get(`https://api.unsplash.com/users/${process.env.UNSPLASH_USER}/likes?client_id=${process.env.ACCESS_KEY}`)
    .then(response => {
      res.status(200).send(response.data);
    }).catch(err => {
      console.error(err);
      res.status(500).send();
    });
});

// Buscar imágenes
app.get('/api/search/photos', (req, res) => {
  const word = req.query.search;
  const numPage = req.query.page;

  unsplash.search.getPhotos({
    query: word,
    page: numPage,
    perPage: 10
  }).then(data => {
    if (data.status === 200) {
      res.status(data.status).send(data.response);
    } else {
      res.status(data.status).send();
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  });
});

// generar like para una foto
app.get('/api/photos/like', (req, res) => {
  const axios_instance = axios.create({
    headers: {
      Authorization: `Bearer ${process.env.AUTH_TOKEN}`
    }
  });

  axios_instance.post(`${process.env.UNSPLASH_BASE_URL}/photos/${req.query.id}/like/`)
    .then(response => {
      res.status(200).send(response.data);
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
});

// Obtener token para autenticación en unsplash
app.get('/auth', (req, res) => {
  axios.get('https://unsplash.com/oauth/token', {
    params: {
      'client_id': process.env.ACCESS_KEY,
      'client_secret': process.env.SECRET_KEY,
      'redirect_uri': process.env.REDIRECT_URI,
      'code': req.query.code,
      'grant_type': 'authorization_code'
    }
  }).then(response => {
    res.status(200).send(response.data);
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  });
});

// Obtener fotos random
app.get('/random-photos', (req, res) => {
  const topics = req.query.topics;
  const topicsList = topics.split(',');

  unsplash.photos.getRandom({
    count: 10,
    topicIds: topicsList
  }).then(data => {
    if (data.status === 200) {
      res.status(data.status).send(data.response);
    } else {
      res.status(data.status).send();
    }
  }).catch(err => {
    console.error(err);
    res.status(500).send();
  });
})

const port = process.env.PORT || 8080;

var server = app.listen(port, 'localhost', function () {
});

export default app;