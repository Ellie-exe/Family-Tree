import React from 'react';
import {useState, useEffect} from "react";
import styles from './Feed.module.css';

const Feed = () => {
    const [trees, setTrees] = useState([]);

    useEffect(async () => {
        /* need to get actual route */
        setTrees(await fetch('http://localhost').trees)
    }, [])
    return (
        <div className={styles.container}>
            {trees.length !== 0 && trees.map(tree => {
                return (
                    <div>
                        <h1>{tree.name}</h1>
                        <h1>{tree.numOccupants}</h1>
                    </div>
                )
            })}

        </div>
    )
};
export default Feed;