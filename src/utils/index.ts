const writeToFile: (content: string, fileName: string) => void = (content: string, fileName: string) => {
let hiddenElement = document.createElement("a");
hiddenElement.href = "data:text;charset=utf-8," + encodeURI(content);
hiddenElement.target = "_blank";
hiddenElement.download = `${fileName}.txt`;
hiddenElement.click();
}