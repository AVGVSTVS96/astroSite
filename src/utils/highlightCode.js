export function highlightCode(element) {
    const codeElements = element.querySelectorAll("pre code");
    codeElements.forEach((codeElement) => {
        hljs.highlightElement(codeElement);
    });
}
