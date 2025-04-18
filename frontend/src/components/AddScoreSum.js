

export default async function AddScoreSum  ({score, userName, game}) {
    try {
            const res = await fetch(`http://192.168.100.8:3010/addScoreSum?score=${userName},${game},${score}`);            
            const responseText = await res.text();
            console.warn(responseText);
    } catch (error) {
            console.error("Błąd zapisu wyniku:", error);
        }
};

