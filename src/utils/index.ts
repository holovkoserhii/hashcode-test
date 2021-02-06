// import axios from "axios";

import { function1 } from "../players/player1/player1";

export const writeToFile: (content: string, fileName: string) => void = (content: string, fileName: string) => {
    const hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text;charset=utf-8," + encodeURI(content);
    hiddenElement.target = "_blank";
    hiddenElement.download = `${fileName}.txt`;
    hiddenElement.click();
}

export const readFromFile = async (url: string) => {
    
    const fileToProcess = url;
    const file: any = await fetch(fileToProcess);

    const blob = await file.blob()
    const reader = new FileReader();

    reader.onload = function(event){
        const content = event.target.result as string
        function1(content)
        
      };

    await reader.readAsText(blob)
}