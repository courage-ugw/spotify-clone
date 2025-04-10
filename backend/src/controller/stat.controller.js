import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (req, res, next) => {
    try {
      // const totalSongs = await Song.countDocuments();
      // const totalUsers = await User.countDocuments();
      // const totalAlbums = await Album.countDocuments();
  
      const [totalSongs, totalUsers, totalAlbums, totalArtists] = await Promise.all([
        Song.countDocuments(),
        User.countDocuments(),
        Album.countDocuments(),
        Song.aggregate([
          { $unionWith: {coll: "albums",pipeline: []} },
          { $group: { _id: "$artist" } },
          { $group: { _id: null, count: { $sum: 1 } } }, // Count the number of distinct artists
          { $project: { _id: 0, count: 1 } } // Project the count as a single object
        ]),
      ])
      res.status(200).json({ totalSongs, totalUsers, totalAlbums, totalArtists: totalArtists[0].count });
    } catch (error) {
      next(error);
    }
  }
