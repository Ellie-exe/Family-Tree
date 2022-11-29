import React, { useState, useEffect, useRef } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { useLocation } from 'react-router-dom';
import Navbar from "../navbar/Navbar";
import MemberEditor from '../member-editor/MemberEditor';
import styles from './TreeEditor.module.css';
import styled, { css } from 'styled-components';

const TreeEditor = () => {
    const [tree, setTree] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [memberModal, setMemberModal] = useState(false);
    const [member, setMember] = useState(null);
    const [update, setUpdate] = useState(0);
    const [name, setName] = useState('');
    const [members, setMembers] = useState(null);
    const [builtTree, setBuiltTree] = useState([]);
    const [topLevel, setTopLevel] = useState(null);
    const [map, setMap] = useState({});

    const ref = useRef(null);

    let StyledNode = styled.div`
        padding: 2vh 8vh;
        border-radius: 5vh;
        display: inline-block;
        border: 1px solid gray;
        color: lightgray;
        cursor: pointer;`;


    const getTopLevel = (localTree) => {
        return localTree.members.filter(mem => !mem.parents.length);
    };

    const computeJSXSelfAllDesc = (mem) => {
        // if (!mem) return <TreeNode onClick={() => onMember(mem._id)} label={<StyledNode className={styles.node} onClick={() => onMember(mem._id)}>{mem.name}</StyledNode>}></TreeNode>
        // if (!mem.children) return <TreeNode onClick={() => onMember(mem._id)} label={<StyledNode className={styles.node} onClick={() => onMember(mem._id)}>{mem.name}</StyledNode>}></TreeNode>
        if (!mem.children || !mem.children.length) {
          return <TreeNode onClick={() => onMember(mem._id)} label={<StyledNode className={styles.node} 
          onClick={() => onMember(mem._id)}>{mem.name}</StyledNode>}></TreeNode>
        } 
        else {
          return <TreeNode onClick={() => onMember(mem._id)} label={<StyledNode className={styles.node} 
          onClick={() => onMember(mem._id)}>{mem.name}</StyledNode>}>{mem.children.map(child => computeJSXSelfAllDesc(map[child._id]))}</TreeNode>;
        }
      }

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

    const addChildHandler = () => {

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
        if (id !== -1)setMember(tree.members.find(({ _id }) => _id === id)); /* find member object w/ _id == id */
        else setMember(null);
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
                setTree(jsRes.tree);
                // setTopLevel(getTopLevel(`jsRes.tree));
                const o = map;
                for (const member of jsRes.tree.members) {
                    map[member._id] = member;
                }
                setMap(o);
                if (member) {
                    const newMember = jsRes.tree.members.find(mem => mem._id === member._id);
                    setMember(newMember);
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

            <Tree ref={ref}
                lineWidth={'2px'}
                lineColor={'white'}
                lineBorderRadius={'10px'}
            label={<StyledNode className={styles.root} onClick={() => onMember(-1)}>Adam & Eve</StyledNode>} 
            >
                {tree !== null && getTopLevel(tree).map(mem => computeJSXSelfAllDesc(mem))}
                </Tree>
            {memberModal && member && <MemberEditor exitModal={exitModal} memberId={member} treeId={queryParams.get('treeId')} onX={exitModal} member={member} onUpdate={onUpdate}/>}
            {memberModal && !member && <MemberEditor exitModal={exitModal} memberId={-1} treeId={queryParams.get('treeId')} onX={exitModal} member={member} onUpdate={onUpdate}/>}
            {/* <form onSubmit={(e) => addMemberHandler(e.name)}> */}
            {/* <input type='text' value={name} onChange={(e) => setName(e.target.value)} /> */}
            {/* <button type='submit'>Submit</button> */}
            {/* </form> */}
        </div>
    )
};

export default TreeEditor;