import axios from "axios";

export const KEY = '19034ede19a029ea02279bd1a848f0da';
export const PROXY = 'https://cors-anywhere.herokuapp.com/';

export async function searchGamesByName(gameName) {
    try {
        const { data } = await axios.get(
            `${PROXY}https://api-v3.igdb.com/games?search=${gameName}&fields=name`, {
                headers: {
                    'user-key': KEY
                }
            });
            return data;
    } catch (e) {
        throw new Error('Something went wrong!');
    }
}

export async function getGameInformation(gameId) {
    console.log(gameId)
    try {
        const { data } = await axios.get(
            `${PROXY}https://api-v3.igdb.com/games/${gameId}?&fields=name,summary,release_dates,involved_companies`, {
                headers: {
                    'user-key': KEY
                }
            });
        return data[0];
    } catch (e) {
        throw new Error('Something went wrong!');
    }
}