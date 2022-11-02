import React, { useState } from 'react';

const TreeEditor = () => {
  const [members, setMembers] =  useState([{name: 'Jim'}, {name: 'Ryan'}, {name: 'Cory'}, {name: 'Cameron'}]);

  return(<>{members.map(member => <h1>{member.name}</h1>)}</>)
};

export default TreeEditor;