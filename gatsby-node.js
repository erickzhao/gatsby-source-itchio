exports.sourceNodes = ({ actions, createNodeId, createContentDigest }, configOptions) => {
  const { createNode } = actions;

  // plugin code goes here...
  console.log('Testing my plugin', configOptions);
};
