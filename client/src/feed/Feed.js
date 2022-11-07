import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Feed.module.css';

const Feed = () => {
    const [trees, setTrees] = useState([{id: '4592345', numMembers: 5}]);
    const history = useHistory();

    const onTreeClick = (treeId) => {
        history.push(`/trees?treeId=${treeId}`);
    };

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
                {trees.map(tree => {
                    return (
                        <div className={styles.tree} onClick={() => onTreeClick(tree.id)}>
                            <h1>{tree.id}</h1>
                            <h1>{tree.numMembers}</h1>
                        </div>
                    )
                })}
                <span>&#43;</span>
            </div>
        </div>
    )
};
export default Feed;