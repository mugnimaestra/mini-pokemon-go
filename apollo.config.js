module.exports = {
  client: {
    includes: ["src/graphql/**"],
    localSchemaFile: "./schema.json",
    service: {
      name: "mini-pokemon-go",
      url: "https://graphql-pokeapi.graphcdn.app/",
    },
  },
};
