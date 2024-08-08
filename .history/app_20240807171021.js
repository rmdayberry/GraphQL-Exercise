document.addEventListener("DOMContentLoaded", () => {
  const endpoint = "https://swapi-graphql.netlify.app/.netlify/functions/index";

  const queries = {
    films: ` {
  allFilms{
    films{
      title
    }
  }
}`,
    character: `
{
  person(id: "cGVvcGxlOjE=") {
    name
  }
}
`,
    planets: `
{
  allPlanets(first: 5) {
    planets {
      name
    }
  }
}
`,
    starships: `
{
  allStarships(first: 3) {
    starships {
      name
      model
    }
  }
}
`,
    characterAndStarships: `{
allPeople(first: 5) {
  people{
    name
      starshipConnection {
        starships{
          name
          }
        }
      }
    }
  }`,
    allSpecies(first: 5) {
      species {
        name
        language
      }
    }
  }
    speciesAndLanguages: `{
    allSpecies(first: 5) {
    species {
    name 
    languages
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
  fetchData(queries.character, "character");
  fetchData(queries.planets, "planets");
  fetchData(queries.starships, "starships");
});
