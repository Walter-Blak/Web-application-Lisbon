export default async function GetScore({ miniGame, SM }) {
    try {
      const dbResponse = await fetch(`http://192.168.100.8:3010/getScore?minigame=${miniGame},${SM}`);
      const jsonResponse = await dbResponse.json();
  
      return Array.isArray(jsonResponse) ? jsonResponse : []; //check if jsonResponse is Array
    } catch (error) {
      console.error("Błąd pobierania wyniku:", error);
      return []; 
    }
  }
  