import { useState } from "react";
import Welcome from "../components/Welcome.jsx";
import { downloadName, readName } from "../nameFiles.js";
export default function Home(){
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    
    async function loadFile(event){
        const file = event.target.files[0];
        event.target.value = "";
        if(!file) return;
        try{
            const loadedName = await readName(file);
            setName(loadedName);
            setStatus("Name loaded from JSON.");
        } catch {
            setStatus('Load failed. Use JSON like {"name":"Ana"}.');
        }
    }
    return(
        <main>
            <h1> Home </h1>
            <label htmlFor="name">Your name: </label>
            <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Welcome name={name.trim() || "Guest"} />
            <button type="button" onClick={() => downloadName(name)}>
                Save JSON
            </button>
            <label htmlFor="json-file">Load JSON:</label>
            <input id="json-file" type="file"
                accept=".json,application/json" onChange={loadFile} />
            <p> Example email: class@example.com</p>
            <p role="status">{status}</p>
        </main>
    );
}


