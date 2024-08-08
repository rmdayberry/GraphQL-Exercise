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

    speciesAndLanguages: `{
    allSpecies(first: 5) {
      species {
        name 
          languages
        }
       }
      }`,
    planetsAndClimate: `{
      allPlanets(first:5){
        planets{
          name
            climate
              }
            }
          }`,
    vehicleAndCosts: `{
      allVehicles(first:3) {
        vehicles {
         name
          costInCredits
          }
        }
      }`,
    characterInFilm: `{
    film(id: "ZmlsbXM6MQ==")
      characterConnection {
        characters{
          name
            }
          }
        }`,
    multiFilmCharacters: `{
      allPeople{
        people
          name
          filmConnection{
              films{
                title
                }
              }
            }
          }`,
    aggregatedFilmStatistics: `{
      allFilms{
        films{
          characterConnection{
            characters{
              name
              }
            }
          }
        }
      }`,
    fullCharacterProfile: `{
      person(id: "cGVvcGxl0jE="){
        name
          filmConnection{
            films{
              title
              }
            }
          starshipConnection{
            starships{
              name
              }
            }
            homeworld {
              name
            }
          }
        }`,
    linkCharacterWithPlanets: `{
      allPeople(first: 5){
        people{
          name
          homeworld{
            name
            population
            }
          }
        }
      }`,
    vehiclesPilotsAndSpecies: `{
        allVehicles(first: 3){
          vehicles {
            name
            pilotConnection {
              pilots{
                name
                species{
                name
                }
              }
            }
          }
        }
      }`,
    filmsAndAssociatedEntities: `{
    allFilms(first: 3){
      films {
        title
        characterConnection{
          characters{
            name
            }
          }
          planetConnection{
            planets{
            name
            }
          }
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
  fetchData(queries.characterAndStarships, "charactersStarships");
  fetchData(queries.speciesAndLanguages, "speciesLanguages");
  fetchData(queries.planetsAndClimate, "planetsClimate");
});
