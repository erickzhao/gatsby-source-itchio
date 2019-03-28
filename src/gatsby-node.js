import axios from "axios";

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions;
  const { key } = configOptions;

  const apiUrl = `https://itch.io/api/1/${key}/my-games`;

  let response;
  try {
    response = await axios.get(apiUrl);
  } catch (e) {
    throw new Error(
      `The HTTP request failed - ${e.response.status}: ${e.response.statusText}`
    );
  }

  const { data } = response;

  if (Array.isArray(data.errors)) {
    data.errors.forEach(error => {
      throw new Error(`The itch.io API returned the following error: ${error}`);
    });
  }

  const { games } = data;

  const gameNodes = games.map(game => {
    const nodeId = createNodeId(`itchio-game-${game.id}`);
    const nodeContent = JSON.stringify(game);
    const nodeData = {
      ...game,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: "ItchioGame",
        content: nodeContent,
        contentDigest: createContentDigest(game)
      }
    };

    return nodeData;
  });

  gameNodes.forEach(node => createNode(node));
};
