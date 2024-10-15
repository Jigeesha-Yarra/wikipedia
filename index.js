// Access input and search result elements
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const spinner = document.getElementById("spinner");

// Function to create and render search results
function displayResults(results) {
    searchResults.innerHTML = ""; // Clear previous results
    results.forEach(result => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");

        const resultTitle = document.createElement("a");
        resultTitle.href = result.link;
        resultTitle.target = "_blank";
        resultTitle.classList.add("result-title");
        resultTitle.textContent = result.title;

        const resultDescription = document.createElement("p");
        resultDescription.classList.add("link-description");
        resultDescription.textContent = result.description;

        resultItem.appendChild(resultTitle);
        resultItem.appendChild(resultDescription);
        searchResults.appendChild(resultItem);
    });
}

// Function to handle search
async function handleSearch(event) {
    if (event.key === "Enter") {
        const query = searchInput.value.trim();
        if (query === "") {
            alert("Please enter a keyword to search.");
            return;
        }

        // Show spinner while fetching results
        spinner.classList.remove("d-none");
        searchResults.innerHTML = ""; // Clear previous results

        try {
            const response = await fetch(`https://apis.ccbp.in/wiki-search?search=${query}`);
            const data = await response.json();
            displayResults(data.search_results); // Render search results
        } catch (error) {
            alert("Failed to fetch search results. Please try again.");
        } finally {
            // Hide the spinner after fetching results
            spinner.classList.add("d-none");
        }
    }
}

// Event listener for search input
searchInput.addEventListener("keydown", handleSearch);
