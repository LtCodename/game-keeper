import axios from "axios";

export async function searchGamesByName(gameName) {
    try {
        const { data } = await axios.get(
            `https://cors-anywhere.herokuapp.com/https://api-v3.igdb.com/games`, {
                headers: {
                    'user-key': '19034ede19a029ea02279bd1a848f0da'
                },
                data: `search "${gameName}"`
            });
        return data;
    } catch (e) {
        throw new Error('Something went wrong!');
    }
}