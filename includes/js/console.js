class WebConsole {
    constructor(codeElementId, consoleIOElementId){
        this.codeElement = document.getElementById(codeElementId);
        this.consoleIOElementId = document.getElementById(consoleIOElementId);
    }

    log(text){
        const codeDiv = document.createElement('div');
        codeDiv.appendChild(document.createTextNode(text));
        this.consoleIOElementId.insertBefore(codeDiv, this.consoleIOElementId.firstChild);
    }
}

window.addEventListener('DOMContentLoaded', function (event) {
    document.getElementById("submit").addEventListener("click", runCode);

    document.getElementById('code').addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById('submit').click();
        }
    });
});

function runCode() {
    const webConsole = new WebConsole('code', 'consoleIO');
    try {
        const code = webConsole.codeElement.value;
        let evaluatedCode = eval(code);
        evaluatedCode = (typeof evaluatedCode === 'string')? JSON.stringify(evaluatedCode) : evaluatedCode;
        
        console.log("> ",code);
        console.log("< " + evaluatedCode);

        webConsole.log("< " + evaluatedCode)
        webConsole.log("> " + code)

        webConsole.codeElement.value = '';
    }
    catch (error) {
        console.log(error);
        webConsole.log(error.name + ": " + error.message);
    }
}