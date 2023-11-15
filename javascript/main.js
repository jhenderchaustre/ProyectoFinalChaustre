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
        modalContainer.innerHTML = "";
        modalContainer.style.display = "flex";
        // ... Código actual para mostrar el carrito en el modal
    });

    const updateLocalStorage = () => {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    getProducts();
});
