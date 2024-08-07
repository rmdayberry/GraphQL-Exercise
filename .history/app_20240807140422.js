const endpoint = "https://swapi-graphql.netlify.app/.netlify/functions/index";

const queries = {
  films: ` {
  allFilms{
    films{
      title
    }
  }
}`,
};

async function fetchData(query, elementId) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    const element = document.getElementById(elementId);
    element.innerHTML = JSON.stringify(data.data, null, 2);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchData(queries.films, "films");