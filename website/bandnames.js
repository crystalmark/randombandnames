fetch('https://wc8ifn7koc.execute-api.eu-west-2.amazonaws.com/prod', {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((bandnames) => {
        var bandnamesList = document.getElementById("bandnamesList");
        bandnamesList.innerHTML = bandnames;
    });