
document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.accordion details');
    const search = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    // Only one open at a time
    items.forEach(detail => {
        detail.addEventListener('toggle', function() {
            if (this.open) {
                items.forEach(other => {
                    if (other !== this) other.open = false;
                });
            }
        });
    });

    // Live search
    search.addEventListener('input', function() {
        const term = this.value.toLowerCase().trim();
        let visibleCount = 0;

        items.forEach(item => {
            const text = item.querySelector('summary').textContent.toLowerCase();
            const match = term === '' || text.includes(term);

            item.style.display = match ? '' : 'none';
            if (match) visibleCount++;

            // Close filtered out items
            if (!match && item.open) item.open = false;
        });

        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    });
});
