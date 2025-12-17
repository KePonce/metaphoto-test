// 1) Importar librerías
const express = require('express');
const axios = require('axios');

// 2) Crear la app de Express
const app = express();
const PORT = 3000;

// 3) Endpoint de prueba (health check)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 4) Endpoint de enriquecimiento: /externalapi/photos/:id
app.get('/externalapi/photos/:id', async (req, res) => {
  try {
    // ID recibido desde la URL
    const photoId = req.params.id;

    // Llamada 1: obtener la foto
    const photoResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`
    );
    const photo = photoResponse.data;

    // Llamada 2: obtener el álbum de la foto
    const albumResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/albums/${photo.albumId}`
    );
    const album = albumResponse.data;

    // Llamada 3: obtener el usuario del álbum
    const userResponse = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${album.userId}`
    );
    const user = userResponse.data;

    // Respuesta final enriquecida
    res.json({
      id: photo.id,
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
      album: {
        id: album.id,
        title: album.title,
        user: user
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch or enrich data'
    });
  }
});

app.get('/externalapi/photos', async (req, res) => {
  try {
    // 1) Traer data “cruda” de las 3 APIs internas
    const photosResp = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const albumsResp = await axios.get('https://jsonplaceholder.typicode.com/albums');
    const usersResp = await axios.get('https://jsonplaceholder.typicode.com/users');

    const photos = photosResp.data;
    const albums = albumsResp.data;
    const users = usersResp.data;

    // 2) Enriquecer: cada photo se convierte en photo + album + user
    let result = photos.map((photo) => {
      const album = albums.find(a => a.id === photo.albumId);
      const user = users.find(u => u.id === album.userId);

      return {
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
        album: {
          id: album.id,
          title: album.title,
          user: user
        }
      };
    });

    // 3) Leer filtros desde la URL (query params)
    const titleFilter = req.query.title; // contains
    const albumTitleFilter = req.query['album.title']; // contains
    const emailFilter = req.query['album.user.email']; // equals

    // 4) Aplicar filtros (si vienen)
    if (titleFilter) {
      result = result.filter(p => p.title.includes(titleFilter));
    }

    if (albumTitleFilter) {
      result = result.filter(p => p.album.title.includes(albumTitleFilter));
    }

    if (emailFilter) {
      result = result.filter(p => p.album.user.email === emailFilter);
    }

    // 5) Responder
        // 5) Paginación (Paso 6)
    const limit = req.query.limit ? Number(req.query.limit) : 25;
    const offset = req.query.offset ? Number(req.query.offset) : 0;

    const paginated = result.slice(offset, offset + limit);

    res.json(paginated);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch/filter photos' });
  }
});


// 5) Levantar el servidor
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
