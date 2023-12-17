// Targeting the elements
const description: any = document.querySelector("#description-text");
const prefix: any = document.querySelector("#prefix-text");
const snippet: any = document.querySelector("#snippet-text");
const outputDiv: any = document.querySelector(".output");
const copyButton: any = document.querySelector("#copy-button");
const alertDiv: any = document.querySelector(".alert");

// Html String
let html: string;

// Adding Event Listeners
description.addEventListener("input", (event) => outputDiv.innerHTML = generateSnippetString(description.value, prefix.value, snippet.value));
prefix.addEventListener("input", (event) => outputDiv.innerHTML = generateSnippetString(description.value, prefix.value, snippet.value));
snippet.addEventListener("input", (event) => outputDiv.innerHTML = generateSnippetString(description.value, prefix.value, snippet.value));
copyButton.addEventListener("click", copyToClipboard);

// Function to generate the snippet string
function generateSnippetString(description: string, prefix: string, snippet: string) : string {
    snippet = snippet.replace(/\n/g, '",\n  "')

    // Updating the html string
    html = `
          <pre>"${description}": { </pre>
          <pre>  "prefix": "${prefix}", </pre>
          <pre>  "body": [ </pre>
          <pre>  "${snippet}" </pre>
          <pre>   ], </pre> 
          <pre>  "description": "${description}" </pre>
          <pre>} </pre>
    `;

    // returning the string
    return html;
}

// Function to copy content to clipboard
function copyToClipboard(event) {

    // Copying the text to the Clipboard
    let range = document.createRange();
    range.selectNode(outputDiv); 
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    // Showing message 
    alertDiv.style.top = "0px";

    copyButton.src = "../assets/images/check.png";

    setTimeout(() => {
        copyButton.src = "../assets/svg/clipboard.svg";
        alertDiv.style.top = "-80px";
    }, 2000);
}

