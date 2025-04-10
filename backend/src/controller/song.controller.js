import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
    try {
        // sort the songs by createdAt in descending order => newest songs first and oldest last
        const songs = await Song.find().sort({ createdAt: -1 });
        res.status(200).json(songs);
    } catch (error) {
        next(error);
    }
}

// export const getSongById = async (req, res, next) => {
//     const { id } = req.params;

//     try {
//         // Attempt to cast the id to an ObjectId
//         const objectId = mongoose.Types.ObjectId(id);

//         const song = await Song.findById(objectId);
//         if (!song) {
//             return res.status(404).json({ error: 'Song not found.' });
//         }
//         res.status(200).json(song);
//     } catch (error) {
//         // Handle the case where the id is not a valid ObjectId
//         if (error instanceof mongoose.Error.CastError) {
//             return res.status(400).json({ error: 'Invalid song ID format.' });
//         }
//         next(error);
//     }
// }

export const getFeaturedSongs = async (req, res, next) => {
    try {
        // fetch 6 random songs using mongoose aggregation pipeline
        const featuredSongs = await Song.aggregate([
            { $sample: { size: 6 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } }
        ]);
        res.status(200).json(featuredSongs);
    } catch (error) {
        next(error);
    }
}

export const getMadeForYouSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs using mongoose aggregation pipeline
        const madeForYouSongs = await Song.aggregate([
            { $sample: { size: 4 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } }
        ]);
        res.status(200).json(madeForYouSongs);
    } catch (error) {
        next(error);
    }
}

export const getTrendingSongs = async (req, res, next) => {
    try {
        // fetch 4 random songs using mongoose aggregation pipeline
        const trendingSongs = await Song.aggregate([
            { $sample: { size: 4 } },
            { $project: { _id: 1, title: 1, artist: 1, imageUrl: 1, audioUrl: 1 } }
        ]);
        res.status(200).json(trendingSongs);
    } catch (error) {
        next(error);
    }
}
