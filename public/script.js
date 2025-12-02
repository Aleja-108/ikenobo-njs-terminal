// CONFIG
let token = null;
const API_URL = "https://ikenobo-njs-terminal-production.up.railway.app";

// LOGIN
document.getElementById("btn-login").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error en login: " + (data.msg || data.error));
      return;
    }

    token = data.token;
    document.getElementById("token").textContent = "Token generado ✔️: " + token;
    alert("Login exitoso");

  } catch (err) {
    console.error(err);
    alert("Error de conexión");
  }
});


// LOGOUT
document.getElementById("btn-logout").addEventListener("click", () => {
  token = null;
  document.getElementById("token").textContent = "Token no generado aún";
  alert("Sesión cerrada");
});

// CREAR PRODUCTO
document.getElementById("btn-create").addEventListener("click", async () => {
  if (!token) return alert("Debes iniciar sesión");

  const data = {
    name: document.getElementById("name").value,
    //productID: document.getElementById("productID").value,
    price: document.getElementById("price").value,
    //image: document.getElementById("image").value,
    description: document.getElementById("description").value
  };

  try {
    const res = await fetch(`${API_URL}/api/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok) {
      alert("Error al agregar el producto: " + (json.msg || json.error));
      return;
    }

    alert("Producto agregado");
    getProducts();

  } catch (err) {
    console.error(err);
  }
});

// LIMPIAR FORMULARIO
document.getElementById("btn-clear").addEventListener("click", () => {
  ["name", "price", "description"].forEach(id => {
    document.getElementById(id).value = "";
  });
});

// LISTAR PRODUCTOS
document.getElementById("btn-get-list").addEventListener("click", () => {
  getProducts();
});

async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/api/products`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (!Array.isArray(data)) {
      alert("Error inesperado al obtener productos");
      return;
    }

    renderTable(data);

  } catch (err) {
    console.error(err);
    alert("No se pudieron cargar los productos");
  }
}

// BUSCAR PRODUCTO POR ID
document.getElementById("btn-search").addEventListener("click", async () => {
  const id = document.getElementById("searchID").value;

  if (!id) return alert("Ingresá un ID");

  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const product = await res.json();

    if (!res.ok) {
      alert(product.message || "Producto no encontrado");
      return;
    }

    renderTable([product]);

  } catch (err) {
    console.error(err);
  }
});


// ELIMINAR PRODUCTO
async function deleteProduct(id) {
  if (!token) return alert("Debes iniciar sesión");
  if (!confirm("¿Eliminar producto?")) return;

  try {
    const res = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) {
      const json = await res.json();
      alert(json.error || "No se pudo eliminar");
      return;
    }

    alert("Producto eliminado");
    getProducts();

  } catch (err) {
    console.error(err);
  }
}

// RENDERIZAR TABLA
function renderTable(products) {
  const tbody = document.getElementById("tabla-productos");
  tbody.innerHTML = "";

  products.forEach(p => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${p.id}</td>
      
      <td>${p.name}</td>
      <td>$${p.price}</td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
