// Toggle dropdown visibility
function toggleDropdown(id) {
    document.getElementById(id).classList.toggle("hidden");
}

// Toggle visibility of a block (e.g., abstract)
function toggleBlock(id) {
    document.getElementById(id).classList.toggle("hidden");
}

document.addEventListener("DOMContentLoaded", () => {

    function enablePillBehavior(selector) {
        document.querySelectorAll(selector).forEach(label => {
            const pillX = label.querySelector(".pill-x");

            label.addEventListener("click", () => {
                const isSelected = label.classList.contains("selected");

                if (isSelected) {
                    // Deselect
                    label.classList.remove("selected");
                    if (pillX) pillX.classList.add("hidden");
                } else {
                    // Select
                    label.classList.add("selected");
                    if (pillX) pillX.classList.remove("hidden");
                }

                filterPublications();
            });
        });
    }

    enablePillBehavior(".publications-container .pill");

    const searchInput = document.getElementById("pubSearch");
    if (searchInput) searchInput.addEventListener("input", filterPublications);

    function filterPublications() {
        const selectedTypes = Array.from(document.querySelectorAll(".filter-type.selected"))
                                   .map(el => el.dataset.value);
        const selectedCategories = Array.from(document.querySelectorAll(".filter-category.selected"))
                                        .map(el => el.dataset.value);
        const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";

        document.querySelectorAll(".year-block").forEach(yearBlock => {
            const pubs = yearBlock.querySelectorAll(".pub");
            let visibleCount = 0;

            pubs.forEach(pub => {
                const type = pub.dataset.type.toLowerCase().trim();
                const category = pub.dataset.category.toLowerCase().trim();
                const text = pub.textContent.toLowerCase();

                // AND logic across filters, OR logic inside a filter
                const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(type);
                const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(category);
                const searchMatch = searchTerm === "" || text.includes(searchTerm);

                const isVisible = typeMatch && categoryMatch && searchMatch;

                pub.style.display = isVisible ? "" : "none";
                if (isVisible) visibleCount++;
            });

            yearBlock.style.display = visibleCount > 0 ? "" : "none";
        });
    }

});
