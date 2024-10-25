const tableRows = document.querySelectorAll('table tr');

tableRows.forEach(row => {
  row.addEventListener('click', () => {
    const rowId = row.id; // Get the row ID

    // Make the API call
    fetch(`/api/data/${rowId}`)
      .then(response => response.json())
      .then(data => {
        // Handle the API response data
        console.log(data); 
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching data:', error);
      });
  });
});