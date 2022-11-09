import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Field from '../field/Field';

const TreeEditor = () => {
    const history = useHistory();
    const [tree, setTree] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [memberModal, setMemberModal] = useState(false);
    const [member, setMember] = useState(null);

    /**
     * To be called when the user clicks on a specific member in the tree. It will bring up a
     * modal where the user can edit the member's information.
     *
     * @param id the id of the member
     */
    const onMember = (id) => {
        setMemberModal(true);
        setMember(tree.members.find(_id => _id === id));
    };

    /**
     * To be called when the user clicks on the "X" to exit the modal. It will result
     * in the modal being collapsed.
     */
    const exitModal = () => {
        setMemberModal(false);
    };

    useEffect(() => {
        const fun = async () => {
            try {
                /* GET for user's tree and all its members */
                const res = await fetch(`https://localhost:3000/api/trees/${queryParams.get('treeId')}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setTree(res.tree);
            } catch (e) {
                console.log(e);
            }
        };
       void fun();
    }, [])

    return (
        <div>
            {tree.members.map(member => <h1 onClick={() => onMember(member.id)}>{member.name}</h1>)}
            <h1 onClick={() => onMember(5)}>MEMBER</h1>
            {memberModal && <form>{member.fields.map(field => {
                return (<div><Field _id={field._id} name={field.name} val={field.val}/></div>)
            })
            }</form>}
        </div>
    )
};


export default TreeEditor;