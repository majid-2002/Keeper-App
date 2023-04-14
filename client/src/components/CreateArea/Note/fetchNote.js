import axios from "axios";


export default async function fetchNotes() {
    try {
      const response = await axios.get("http://localhost:3001/notes");
      return response.data;
    } catch (error) {
      console.error(error);
    }
}