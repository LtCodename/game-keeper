import axios from "axios";

export async function searchGamesByName(gameName) {
    try {
        const { data } = await axios.get(
            `https://rawg.io/api/games?page_size=20&search=${gameName}&page=1`, {
                headers: {
                    /*'User-Agent': 'Game Keeper'*/
                }
            });
        return data.results;
    } catch (e) {
        throw new Error('Something went wrong!');
    }
}
export async function getGameInformation(gameName) {
    try {
        const { data } = await axios.get(
            `https://api.rawg.io/api/games/${gameName}`, {
                headers: {
                    /*'User-Agent': 'Game Keeper'*/
                }
            });
        return data;
    } catch (e) {
        throw new Error('Something went wrong!');
    }
}