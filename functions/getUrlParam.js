export function getUrlParam(name) {
    const url = new URLSearchParams(window.location.search);
    const value = url.get(name);
    return value;
}