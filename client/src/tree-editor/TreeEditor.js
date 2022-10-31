import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const TreeEditor = () => {
    const history = useHistory();
    /* Use effect block here */
    const [tree, setTree] = useState([]);
    // add on click of members
    const onMember = (id) => {
        history.push('/member/editor?memberId=' + id);
    };

    return (
        <div>
            {tree.map(member => <h1 onClick={() => onMember(member.id)}>{member.name}</h1>)}
        </div>
    )
};


export default TreeEditor;