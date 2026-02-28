document.getElementById("btnBuscar").addEventListener("click",buscarNoticias);
function buscarNoticias(){
    const q = document.getElementById("txtQuery").value.trim();
    const from = document.getElementById("dateFrom").value;
    const to = document.getElementById("dateTo").value;

    const contenedor = document.getElementById("contenedorNoticias");
    const mensaje = document.getElementById("mensaje");

    contenedor.innerHTML = "";
    mensaje.innerText  = "";

    if(q === ""){
        mensaje.innerText = "Ingresa un texto de busqueda"
        return
    }

    let url = "https://newsapi.org/v2/everything?q=" + encodeURIComponent(q);

    if(from !== ""){
        url += "&from=" + from;
    }

    if(to !== ""){
        url += "&to=" + to;
    }

    url += "&sortBy=popularity";

    const apiKey = "f2b695bd39ac42a3a37858ca44fa9922";
    url += "&apiKey=" + apiKey;

        fetch(url)
        .then(response => response.json())
        .then(data => {

            if(data.status !== "ok"){
                mensaje.innerText = "Error al consultar la API.";
                return;
            }

            if(data.articles.length === 0){
                mensaje.innerText = "No se encontraron noticias.";
                return;
            }

            mostrarNoticias(data.articles);

        })
        .catch(error => {
            mensaje.innerText = "Ocurrió un error en la petición.";
            console.error(error);
        });



}function mostrarNoticias(articulos){

    const contenedor = document.getElementById("contenedorNoticias");
    contenedor.innerHTML = "";



    const colCarousel = document.createElement("div");
    colCarousel.className = "col-12 mb-4";

    const carousel = document.createElement("div");
    carousel.id = "carouselExample";
    carousel.className = "carousel slide";

    const carouselInner = document.createElement("div");
    carouselInner.className = "carousel-inner";

    let primeras = articulos.filter(a => a.urlToImage).slice(0, 3);

    primeras.forEach((noticia, index) => {

        const item = document.createElement("div");
        item.className = "carousel-item" + (index === 0 ? " active" : "");

        const img = document.createElement("img");
        img.src = noticia.urlToImage;
        img.className = "d-block w-100";
        img.alt = noticia.title;

        item.appendChild(img);
        carouselInner.appendChild(item);

    });

    carousel.appendChild(carouselInner);

    const btnPrev = document.createElement("button");
    btnPrev.className = "carousel-control-prev";
    btnPrev.type = "button";
    btnPrev.setAttribute("data-bs-target", "#carouselExample");
    btnPrev.setAttribute("data-bs-slide", "prev");

    btnPrev.innerHTML = `
        <span class="carousel-control-prev-icon"></span>
        <span class="visually-hidden">Previous</span>
    `;

    const btnNext = document.createElement("button");
    btnNext.className = "carousel-control-next";
    btnNext.type = "button";
    btnNext.setAttribute("data-bs-target", "#carouselExample");
    btnNext.setAttribute("data-bs-slide", "next");

    btnNext.innerHTML = `
        <span class="carousel-control-next-icon"></span>
        <span class="visually-hidden">Next</span>
    `;

    carousel.appendChild(btnPrev);
    carousel.appendChild(btnNext);

    colCarousel.appendChild(carousel);
    contenedor.appendChild(colCarousel);

  

    articulos.forEach(noticia => {

        const col = document.createElement("div");
        col.className = "col-md-6";

        const card = document.createElement("div");
        card.className = "card mb-3";
        card.style.maxWidth = "540px";

        const row = document.createElement("div");
        row.className = "row g-0";

        const colImg = document.createElement("div");
        colImg.className = "col-md-4";

        if(noticia.urlToImage){
            const img = document.createElement("img");
            img.src = noticia.urlToImage;
            img.className = "img-fluid rounded-start";
            img.alt = noticia.title;
            colImg.appendChild(img);
        }

        const colBody = document.createElement("div");
        colBody.className = "col-md-8";

        const body = document.createElement("div");
        body.className = "card-body";

        const titulo = document.createElement("h5");
        titulo.className = "card-title";
        titulo.innerText = noticia.title;

        const descripcion = document.createElement("p");
        descripcion.className = "card-text";
        descripcion.innerText = noticia.description || "Sin descripción.";

        const info = document.createElement("p");
        info.className = "card-text";
        info.innerHTML =
            "<small class='text-body-secondary'>" +
            noticia.source.name + " | " +
            new Date(noticia.publishedAt).toLocaleString() +
            "</small>";

        const enlace = document.createElement("a");
        enlace.href = noticia.url;
        enlace.target = "_blank";
        enlace.className = "btn btn-sm btn-outline-primary mt-2";
        enlace.innerText = "Ver noticia";

        body.appendChild(titulo);
        body.appendChild(descripcion);
        body.appendChild(info);
        body.appendChild(enlace);

        colBody.appendChild(body);

        row.appendChild(colImg);
        row.appendChild(colBody);

        card.appendChild(row);
        col.appendChild(card);

        contenedor.appendChild(col);

    });

}


