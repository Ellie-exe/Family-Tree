import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Feed.module.css';

const Feed = () => {
    const [trees, setTrees] = useState([]);
    const [nameForm, setNameForm] = useState(false);
    const [treeName, setTreeName] = useState('');
    const history = useHistory();

    const onTreeClick = (treeId) => {
        history.push(`/trees?treeId=${treeId}`);
    };

    const onPlusClick = () => {
        setNameForm(true);
    };

    const nameChangeHandler = (e) => {
      setTreeName(e.target.value);
    };

    const onNameSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('localhost:8080/api/trees', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({name: treeName})
            })
            setTreeName('');
            const res = await fetch('http://localhost:8080/api/users/trees', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setTrees(res.trees);
        } catch (e) {
            console.log(e);
        }
        setNameForm(false);
    }

    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             return await fetch('http://localhost:8080/api/users/trees', {
    //                 headers: {
    //                     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //                 }
    //             });
    //         } catch (err) {
    //             console.log(err);
    //         }
    //
    //     };
    //     setTrees(getData().trees);
    // }, [])
    return (
        <div className={styles.container}>
            <div>
                {nameForm && <form onSubmit={onNameSubmit}><input onChange={nameChangeHandler} type='text' value={treeName}/>
                    <button type='submit'>Submit</button>
                </form>}
                {trees.map(tree => {
                    return (
                        <div className={styles.tree} onClick={() => onTreeClick(tree.id)}>
                            <h1>{tree.id}</h1>
                            <h1>{tree.numMembers}</h1>
                        </div>
                    )
                })}
                <div onClick={onPlusClick} className={styles.tree}>
                    <h1>+</h1>
                </div>
            </div>
        </div>
    )
};
export default Feed;