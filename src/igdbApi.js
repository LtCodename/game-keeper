import axios from "axios";

export const KEY = '19034ede19a029ea02279bd1a848f0da';
export const PROXY = 'https://cors-anywhere.herokuapp.com/';

export async function searchGamesByName(gameName) {
    try {
        const { data } = await axios.get(
            `${PROXY}https://api-v3.igdb.com/games?search=${gameName}`, {
                headers: {
                    'user-key': KEY
                }
            });
            return data;
    } catch (e) {
        throw new Error('Something went wrong!');
    }
}

export async function searchGamesByMultipleIDs(ids) {
    try {
        const { data } = await axios.get(
            `${PROXY}https://api-v3.igdb.com/games?id=${ids}`, {
                headers: {
                    'user-key': KEY
                }
            });
        return data;
    } catch (e) {
        throw new Error('Something went wrong!');
    }
}