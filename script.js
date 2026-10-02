document.addEventListener("DOMContentLoaded", () => {

    // --- 1. Product Listing, Filtering & Sorting ---
    const products = [
        { id: 1, name: "Wireless Headphones", category: "electronics", price: 99 },
        { id: 2, name: "Mechanical Keyboard", category: "electronics", price: 149 },
        { id: 3, name: "Cotton T-Shirt", category: "apparel", price: 25 },
        { id: 4, name: "Denim Jacket", category: "apparel", price: 85 },
        { id: 5, name: "Gaming Mouse", category: "electronics", price: 59 }
    ];

    const productGrid = document.getElementById("productGrid");
    const categoryFilter = document.getElementById("categoryFilter");
    const priceSort = document.getElementById("priceSort");

    function renderProducts() {
        let filtered = [...products];

        // Filter by Category
        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== "all") {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }

        // Sort by Price
        const selectedSort = priceSort.value;
        if (selectedSort === "low-high") {
            filtered.sort((a, b) => a.price - b.price);
        } else if (selectedSort === "high-low") {
            filtered.sort((a, b) => b.price - a.price);
        }

        // Render Cards
        productGrid.innerHTML = "";
        filtered.forEach(p => {
            const card = document.createElement("div");
            card.className = "product-card";
            card.innerHTML = `
                <h3>${p.name}</h3>
                <p>Category: ${p.category}</p>
                <p class="price">$${p.price}</p>
            `;
            productGrid.appendChild(card);
        });
    }

    categoryFilter.addEventListener("change", renderProducts);
    priceSort.addEventListener("change", renderProducts);
    renderProducts();

    // --- 2. LocalStorage Persistent To-Do List ---
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("apexTasks")) || [];

    function saveAndRenderTasks() {
        localStorage.setItem("apexTasks", JSON.stringify(tasks));
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-btn" onclick="removeTask(${index})">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", () => {
        const text = taskInput.value.trim();
        if (text !== "") {
            tasks.push(text);
            taskInput.value = "";
            saveAndRenderTasks();
        }
    });

    window.removeTask = function(index) {
        tasks.splice(index, 1);
        saveAndRenderTasks();
    };

    saveAndRenderTasks();

    // --- 3. Contact Form Submission ---
    const form = document.getElementById("portfolioContact");
    const statusMsg = document.getElementById("contactStatus");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        statusMsg.textContent = "Thank you for reaching out! Message received.";
        form.reset();
    });
});