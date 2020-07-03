const downloadImage = (imageLink,fileName) => {
    console.log(imageLink)
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

export {downloadImage};