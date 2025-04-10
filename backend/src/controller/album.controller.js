import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json(albums);
    } catch (error) {
        next(error);
    }
}

export const getAlbumById = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const album = await Album.findById(albumId).populate("songs");
        if (!album) {
            return res.status(404).json({ message: "Album not found" });
        }
        res.status(200).json(album);
    } catch (error) {
        next(error);
    }
}

export const createAlbum = async (req, res, next) => {
    const { title, artist, releaseYear, imageUrl } = req.body;
    const album = await Album.create({ title, artist, releaseYear, imageUrl });
    res.status(201).json(album);
}

export const updateAlbum = async (req, res, next) => {
    const { id } = req.params;
    const { title, artist, releaseYear, imageUrl } = req.body;
    const album = await Album.findByIdAndUpdate(id, { title, artist, releaseYear, imageUrl }, { new: true });
    res.status(200).json(album);
}

export const deleteAlbum = async (req, res, next) => {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully" });
}