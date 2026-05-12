let playlists = []

function generateRandomID() {
  return Math.floor(Math.random() * 999999999)
}

const controller = {
  // GET /api/playlists
  // GET /api/playlists/:id
    // GET /api/playlists
  index: (req, res) => {
    res.json(playlists)
  },

  // GET /api/playlists/:id
  show: (req, res) => {
    const { id } = req.params

    const playlist = playlists.find(pl => pl.id === +id)

    if (!playlist) return res.status(404).json({ message: 'playlist not found' })

    res.json(playlist)
  },

  // POST /api/playlists
  save: (req, res) => {
    const { name, tags, musics } = req.body

    if (typeof name !== 'string') {
      return res.status(400).json({ message: 'name must be a string' })
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({ message: 'tags must be an array' })
    }

    if (musics && !Array.isArray(musics)) {
      return res.status(400).json({ message: 'musics must be an array' })
    }

    const newPlaylist = {
      id: generateRandomID(),
      name: name,
      tags: tags,
      musics: musics ?? []
    }

    playlists.push(newPlaylist)

    res.status(201).json(newPlaylist)
  },

  // PUT /api/playlists/:id

   // PUT /api/playlists/:id
  update: (req, res) => {
    const { id } = req.params
    const { name, tags } = req.body

    const playlistIndex = playlists.findIndex(pl => pl.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'playlist not found' })
    }

    if (typeof name === 'string') {
      playlists[playlistIndex].name = name
    }
    if (tags && Array.isArray(tags)) {
      playlists[playlistIndex].tags = tags
    }

    res.json(playlists[playlistIndex])
  },

  // DELETE /api/playlists/:id
  delete: (req, res) => {
    const { id } = req.params

    const playlistIndex = playlists.findIndex(pl => pl.id === +id)

    if (playlistIndex === -1) {
      return res.status(404).json({ message: 'playlist not found' })
    }

    const deletedPlaylist = playlists.splice(playlistIndex, 1)

    res.json(deletedPlaylist)
  },
  // DELETE /api/playlists/:id
}

module.exports = controller
