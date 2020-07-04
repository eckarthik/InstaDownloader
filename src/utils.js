const downloadImage = (imageLink,fileName) => {
    fetch(imageLink)
    .then(response => response.blob())
    .then(response => {
        const blob = new Blob([response]);
        const link = document.createElement('a');
        console.log(link);
        link.href = window.URL.createObjectURL(blob)
        link.download = fileName
        link.click();
        link.remove()
    })
}

const obtainPostUniqueLinkFromURL = (url) => {
    let parts = url.split("/")
    let postLink = null
    for(let i = 0; i< parts.length; i++) {
        if(parts[i] === 'p')
        {
            postLink = parts[i+1];
            break
        }
    }
    return postLink

}

export {downloadImage,obtainPostUniqueLinkFromURL};