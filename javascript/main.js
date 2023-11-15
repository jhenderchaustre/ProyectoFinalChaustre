document.addEventListener("DOMContentLoaded", () => {
    const articulosStore = document.getElementById("articulos");
    const verCarrito = document.getElementById("carrito");
    const modalContainer = document.getElementById("modalContainer");

    let carrito = [];

    const displayProductos = (productos) => {
        productos.forEach((product) => {
            let content = document.createElement("div");
            content.className = "card";
            content.innerHTML = `
                <img src="${product.img}">
                <h2>${product.nombre}</h2>
                <p class="price">${product.precio} $</p>
            `;

            articulosStore.append(content);

            let comprar = document.createElement("button");
            comprar.innerText = "Comprar";
            comprar.className = "comprar";

            content.append(comprar);

            comprar.addEventListener("click", () => {
                console.log("Haciendo clic en Comprar");
                carrito.push({
                    id: product.id,
                    img: product.img,
                    nombre: product.nombre,
                    precio: product.precio
                });
                console.log(carrito);
                updateLocalStorage();
            });
        });
    };

    const getProducts = async () => {
        try {
            const response = await fetch("./javascript/data.json");
            const data = await response.json();

            displayProductos(data);
        } catch (error) {
            console.error("Error al cargar data.json:", error);
        }
    };

    const storedCarrito = localStorage.getItem("carrito");
    if (storedCarrito) {
        carrito = JSON.parse(storedCarrito);
    }

    verCarrito.addEventListener("click", () => {
        console.log("Haciendo clic en Ver Carrito");
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        console.log("Carrito actual:", carrito);
        console.log("Mostrando el modal");
    });

    const updateLocalStorage = () => {
        console.log("Actualizando localStorage con carrito:", carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };
    

    getProducts();
});
