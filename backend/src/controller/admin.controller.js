import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function to upload files to cloudinary
const uploadToCloudinary = async (file) => {
  try { 
    const result = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: "auto" });
    return result.secure_url;
  } catch (error) {
    console.error("Error ");
    throw new Error("Failed to upload file to cloudinary");
  }
};

export const createSong = async (req, res, next) => {
    try {
      if (!req.files || !req.files.imageFile || !req.files.audioFile) {
        return res.status(400).json({ message: "No file uploaded. Please upload an image and an audio file." });
      }

      const { title, artist, albumId, duration } = req.body;
      const imageFile = req.files.imageFile;
      const audioFile = req.files.audioFile;

      const imageUrl = await uploadToCloudinary(imageFile);
      const audioUrl = await uploadToCloudinary(audioFile);

      const song = await Song.create({
        title,
        artist,
        albumId: albumId || null,
        duration,
        imageUrl,
        audioUrl
      });

      // if song belongs to an album, update the album's songs array
      if (albumId) {
        const album = await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } }, { new: true });
        if (!album) {
          return res.status(404).json({ message: "Album not found" });
        }
      }
      res.status(201).json(song);
    } catch (error) {
      console.error("Error creating song", error);
      next(error);
    }
  }
  
export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // check if the song belongs to an album, if so, remove the song from the album and update the album
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
    }
    

    // delete image and audio from cloudinary
    await cloudinary.uploader.destroy(song.imageUrl);
    await cloudinary.uploader.destroy(song.audioUrl);

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error("Error deleting song", error);
    next(error);
  }
}

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const imageFile = req.files.imageFile;
    const imageUrl = await uploadToCloudinary(imageFile);

    const album = await Album.create({ title, artist, releaseYear, imageUrl });
    res.status(201).json(album);
  } catch (error) {
    error.context = "Error creating album";
    next(error);
  }
}

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    // delete all songs from the album
    await Song.deleteMany({ albumId: id });
    await Album.findByIdAndDelete(id);

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (error) {
    error.context = "Error deleting album";
    next(error);
  }
}

// if requireAdmin middleware is successful, this route will be 
// called and return a 200 status and set admin to true
export const checkAdmin = async (req, res, next) => {
  try {
    res.status(200).json({ admin: true });
  } catch (error) {
    next(error);
  }
}