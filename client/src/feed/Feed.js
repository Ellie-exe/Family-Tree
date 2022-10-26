import React from 'react';
import {useState, useEffect} from "react";
import styles from './Feed.module.css';

const Feed = () => {
    const [trees, setTrees] = useState([]);

    useEffect(() => {
        const getData = async () => {
            /* need to get actual route */
            // try {
            //     const data = await fetch('http://localhost')
            //     setTrees(data.trees);
            // } catch (err) {
            //     console.log(err);
            // }
            setTrees([{name: 'Tree 1', numOccupants: 5}]); // placeholder
        };
        getData();
    }, [])
    return (
        <div className={styles.container}>
            <div>
                {trees.length !== 0 && trees.map(tree => {
                    return (
                        <>
                            <h1>{tree.name}</h1>
                            <h1>{tree.numOccupants}</h1>
                        </>
                    )
                })}
                <span>&#43;</span>
            </div>
        </div>
    )
};
export default Feed;