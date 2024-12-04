const letterParam = new URLSearchParams(window.location.search).get('letra');
const downloadPrefix = "https://raw.githubusercontent.com/saragubbins/abc-con-movimiento/refs/heads/main/";

const getItem = async () => {
    const jsonUrl = "datos.json";

    return fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            return data.find(item => item.title == letterParam);
        })
        .catch(error => console.error("Error al cargar los datos del JSON:", error));
};

$(document).ready(async function () {
    const item = await getItem();
    $('#titulo-letra').text(item.title);
    $('#descripcion-letra').text(item.description);
    $('#imagen-letra')
        .attr('src', item.jpg)
        .attr('alt', item.title);

    const downloadUrl = downloadPrefix + item.pdf;
    console.log(downloadUrl);
    fetch(downloadUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            $('#download-letra').attr('href', url);
            $('#download-letra').attr('download', item.title + '.pdf');
        })
        .catch(error => console.error('Error fetching the image:', error));

    const verseLines = item.verso.split(';');
    verseLines.forEach(line => {
        $('#verso-letra').append($('<p class="verse-line">').text(line));
    });

    if (!item.prev) {
        $('.prev').hide();
    }

    if (!item.next) {
        $('.next').hide();
    }

    $('#prev-btn')
        .attr('href', `single.html?letra=${item.prev}`)
        .text(item.prev);

    $('#next-btn')
        .attr('href', `single.html?letra=${item.next}`)
        .text(item.next);

    $('.move-btn').on('click', function () {
        $(this).find('a')[0].click();
    });
});