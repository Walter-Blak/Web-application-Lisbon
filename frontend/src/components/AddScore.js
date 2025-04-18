

export default async function AddScore  ({score, userName, game, SM}) {
    try {
            const res = await fetch(`http://192.168.100.8:3010/addScore?score=${userName},${game},${score},${SM}`);            
            const responseText = await res.text();
            console.warn(responseText);
    } catch (error) {
            console.error("Błąd zapisu wyniku:", error);
        }
};

