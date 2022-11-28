import React, { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useLocation } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import MemberEditor from '../member-editor/MemberEditor';
import styles from './TreeEditor.module.css';

const TreeEditor = () => {
    const [tree, setTree] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [memberModal, setMemberModal] = useState(false);
    const [member, setMember] = useState(null);
    const [update, setUpdate] = useState(0);
    const [name, setName] = useState('');
    const [members, setMembers] = useState(null);

    const StyledNode = styled.div`
    padding: 5px;
    border-radius: 8px;
    display: inline-block;
    border: 1px solid red;
    cursor: pointer;
  `;

    const addSelfAndChildren = (tree) => {
        const arr = [];

        const 
    };

    const getChildren = (parent) => {
        const arr = []
    
    parent.children.forEach(child => arr.push(<TreeNode label={<StyledNode>{child.name}</StyledNode>));
    return arr;
    };

    const onUpdate = () => {
        setUpdate(prevState => prevState + 1);
        setMemberModal(false);
        setMemberModal(true);
    };

    const addMemberHandler = async (e, name) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/api/trees/${queryParams.get('treeId')}/members`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        });
        setUpdate(prev => prev + 1);
        setName('');
    };

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    /**
     * To be called when the user clicks on a specific member in the tree. It will bring up a
     * modal where the user can edit the member's information.
     *
     * @param id the id of the member
     */
    const onMember = (id) => {
        setMemberModal(true);
        setMember(tree.members.find(({ _id }) => _id === id)); /* find member object w/ _id == id */
    };

    /**
     * To be called when the user clicks on the "X" to exit the modal. It will result
     * in the modal being collapsed.
     */
    const exitModal = () => {
        setMemberModal(false);
        setMember(null);
    };

    useEffect(() => {
        const fun = async () => {
            try {
                /* GET for user's tree and all its members */
                const res = await fetch(`http://localhost:8080/api/trees/${queryParams.get('treeId')}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const jsRes = await res.json();
                console.log(jsRes.tree);
                setTree(jsRes.tree);
                if (member) {
                    const newMember = tree.members.find(mem => mem._id === member._id);
                    setMember(newMember);
                    console.log(newMember);
                    const id = member._id;
                    exitModal();
                    onMember(id);
                }

            } catch (e) {
                console.log(e);
            }
        };
        void fun();
    }, [update])

    return (
        <div>
            {memberModal && <Navbar hidden={true} />}
            {!memberModal && <Navbar />}
            {tree && tree.members.map(member => <h1 className={styles.member} key={member._id} onClick={() => onMember(member._id)}>{member.name}</h1>)}
            {memberModal && member && <MemberEditor onX={exitModal} member={member} onUpdate={onUpdate} />}
            <form onSubmit={(e) => addMemberHandler(e.name)}>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
};

export default TreeEditor;