export function renderMarkdown() {
    window.renderMarkdown = function (content) {
        const md = new markdownit();
        return md.render(content);
    };
}

