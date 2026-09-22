export function downnloadName(name){
    const text = JSON.stringify({name}, null, 2);
    const blob = new Blob({text}, {type: "applicaiton/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "class-profile.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function readName(file){
    const text = await file.text();
    const data = JSON.parse(text);

    if( 
        data===null ||
        typeof data !== "object" ||
        Array.isArray(data) ||
        typeof data.name !== "string"
    ) {
        throw new Error('Expect an object with a string name.');
    }
    return data.name;
}