const express = require ('express');
const playlistsController = require ('./controller/playlists-controller');

const playlistsRouter = express.Router ();

playlistsRouter.get ('/', playlistsController.index);
playlistsRouter.get ('/:id', playlistsController.show);
playlistsRouter.post ('/', playlistsController.save);
playlistsRouter.put ('/:id', playlistsController.update);
playlistsRouter.delete ('/:id', playlistsController.delete);

module.exports = playlistsRouter;
