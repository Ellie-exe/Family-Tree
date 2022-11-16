import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Field from '../field/Field';
import Navbar from "../navbar/Navbar";
import MemberEditor from '../member-editor/MemberEditor';
import styles from './TreeEditor.module.css';

const TreeEditor = () => {
    const history = useHistory();
    const [tree, setTree] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [memberModal, setMemberModal] = useState(false);
    const [member, setMember] = useState(null);
    const [members, setMembers] = useState(null);
    const [update, setUpdate] = useState(0);
    const [name, setName] = useState('');
    const [fieldName, setFieldName] = useState('');
    const [fieldVal, setFieldVal] = useState('');
    const [newField, setNewField] = useState(false);

    const addMemberHandler = async (name) => {
        await fetch(`http://localhost:8080/api/trees/${queryParams.get('treeId')}/members`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name})
        });
        setUpdate(prev => prev + 1);
        setName('');
    };

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    };

    const fieldSubmitHandler = async (memberId, fieldId, name, val) => {
        await fetch(`http://localhost:8080/api/members/${memberId}/fields/${fieldId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, value: val})
        });
    }


    /**
     * To be called when the user clicks on a specific member in the tree. It will bring up a
     * modal where the user can edit the member's information.
     *
     * @param id the id of the member
     */
    const onMember = (id) => {
        setMemberModal(true);
        setMember(tree.generation.find(({_id}) => _id === id));
    };

    /**
     * To be called when the user clicks on the "X" to exit the modal. It will result
     * in the modal being collapsed.
     */
    const exitModal = () => {
        setMemberModal(false);
        setMember(null);
    };

    const addFieldHandler = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:8080/api/members/${member._id}/fields`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: fieldName, value: fieldVal})
        });
        setFieldName('');
        setFieldVal('');
        setUpdate(prev => prev + 1);
        // setMemberModal(false);
    };

    const fieldNameChangeHandler = (e) => setFieldName(e.target.value);

    const fieldValChangeHandler = (e) => setFieldVal(e.target.value);

    const addBlankFieldHandler = () => {
        setNewField(true);
    }

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
                if (member) {
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
            {memberModal && <Navbar hidden={true}/>}
            {!memberModal && <Navbar/>}
            {tree && tree.generation.map(member => <h1 className={styles.member} key={member._id}onClick={() => onMember(member._id)}>{member.name}</h1>)}
            {memberModal && <MemberEditor onX={exitModal} member={member}/>}
            <button>Add new member</button>
        </div>
    )
};


export default TreeEditor;