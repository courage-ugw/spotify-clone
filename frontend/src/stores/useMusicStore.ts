import { axiosInstance } from "@/lib/axios" // @ means you are importing from the src folder
import { create } from "zustand"
import { Album, Song, Stats } from "@/types"
import { toast } from "react-hot-toast"

interface MusicStore {
    songs: Song[]
    albums: Album[]
    isLoading: boolean
    error: string | null
    currentAlbum: Album | null
    madeForYouSongs: Song[]
    trendingSongs: Song[]
    featuredSongs: Song[]
    stats: Stats

    fetchAlbums: () => Promise<void>
    fetchSongs: () => Promise<void>
    fetchAlbumById: (albumId: string) => Promise<void>
    fetchMadeForYouSongs: () => Promise<void>
    fetchTrendingSongs: () => Promise<void>
    fetchFeaturedSongs: () => Promise<void>
    fetchStats: () => Promise<void>
    fetchData: (url: string, stateKey: string) => Promise<void>
    deleteSong: (songId: string) => Promise<void>
    deleteAlbum: (albumId: string) => Promise<void>
}


export const useMusicStore = create<MusicStore>((set) => ({
    songs: [],
    albums: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],
    stats: {
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtists: 0,
    },

    // Reusable fetch function
    fetchData: async (url, stateKey) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(url);
            set({ [stateKey]: response.data });
        } catch (error: any) {
            set({ error: error.response?.data?.message || 'An error occurred' });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbums: async () => {
        await useMusicStore.getState().fetchData("/albums", "albums");
    },

    fetchSongs: async () => {
        await useMusicStore.getState().fetchData("/songs", "songs");
    },

    fetchAlbumById: async (albumId) => {
        await useMusicStore.getState().fetchData(`/albums/${albumId}`, "currentAlbum");
    },

    fetchMadeForYouSongs: async () => {
        await useMusicStore.getState().fetchData("/songs/made-for-you", "madeForYouSongs");
    },

    fetchTrendingSongs: async () => {
        await useMusicStore.getState().fetchData("/songs/trending", "trendingSongs");
    },

    fetchFeaturedSongs: async () => {
        await useMusicStore.getState().fetchData("/songs/featured", "featuredSongs");
    },

    fetchStats: async () => {
        await useMusicStore.getState().fetchData("/stats", "stats");
    },

    deleteSong: async (songId: string) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/songs/${songId}`);
            set(state => ({
                songs: state.songs.filter((song) => song._id !== songId),
            }))
            toast.success("Song deleted successfully");
        } catch (error: any) {
            set({ error: error.response?.data?.message });
            toast.error("Failed to delete song");
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAlbum: async (albumId: string) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${albumId}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== albumId),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === albumId)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	}
}));