import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Feed.module.css';

const Feed = () => {
    const [trees, setTrees] = useState([]);
    const [nameForm, setNameForm] = useState(false);
    const [treeName, setTreeName] = useState('');
    const [update, setUpdate] = useState(0);
    const history = useHistory();

    const onTreeClick = (treeId) => {
        history.push(`/editor?treeId=${treeId}`);
    };

    const onPlusClick = () => {
        setNameForm(true);
    };

    const nameChangeHandler = (e) => {
        setTreeName(e.target.value);
        console.log(e.target.value);
    };

    const onNameSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8080/api/trees', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({name: treeName})
            })
            setTreeName('');
            setUpdate(prev => prev + 1);
        } catch (e) {
            console.log(e);
        }
        setNameForm(false);
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:8080/api/trees', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const jsRes = await res.json();
                setTrees(jsRes.trees);
                console.log(jsRes.trees);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, [update])

    return (
        <div className={styles.container}>
            <div>
                {nameForm &&
                    <form onSubmit={onNameSubmit}><input onChange={nameChangeHandler} type='text' value={treeName}/>
                        <button type='submit'>Submit</button>
                    </form>}
                {trees.map(tree => <h1 onClick={() => onTreeClick(tree._id)} key={tree._id}>{tree._id}</h1>)}
                <div onClick={onPlusClick} className={styles.tree}>
                    <h1>+</h1>
                </div>
            </div>
        </div>
    )
};
export default Feed;