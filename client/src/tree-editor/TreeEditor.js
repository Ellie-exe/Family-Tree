import React, { useState } from 'react';

const TreeEditor = () => {
  /* Use effect block here */
  const [tree, setTree] = useState([]);
  // add on click of members

  return (<>{tree.map(member => <h1>{member.name}</h1>)}</>)
};

export default TreeEditor;