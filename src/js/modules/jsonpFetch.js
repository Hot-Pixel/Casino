export default function jsonpFetch(url, params) {
    return fetch(url, params)
        .then(res => res.text())
        .then(data => {
            const script = document.createElement('script');
            script.innerText = data;
            document.body.append(script)
        })
}
