import React, { useEffect, useState } from 'react';
import styles from './Feed.module.css';

const Feed = () => {
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                return await fetch('http://localhost:8080/api/users/trees', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } catch (err) {
                console.log(err);
            }

        };
        setTrees(getData().trees);
    }, [])
    return (
        <div className={styles.container}>
            <div>
                {trees.length !== 0 && trees.map(tree => {
                    return (
                        <>
                            <h1>{tree.id}</h1>
                            <h1>{tree.numMembers}</h1>
                        </>
                    )
                })}
                <span>&#43;</span>
            </div>
        </div>
    )
};
export default Feed;