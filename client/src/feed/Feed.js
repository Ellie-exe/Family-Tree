import React, { useEffect, useState } from 'react';
import styles from './Feed.module.css';
import { useHistory } from 'react-router-dom';
import Modal from '../modal/Modal';
import Navbar from '../navbar/Navbar';

const Feed = () => {

    /* State to keep track of the trees being requested from the database */
    const [trees, setTrees] = useState([]);

    /* State that will be used to force the page to request trees from the database */
    const [update, setUpdate] = useState(0);

    /* State responsible for opening and closing the modal */
    const [modal, setModal] = useState(false);

    /* Need this to redirect the user */
    const history = useHistory();

    /**
     * To be called when a tree is clicked.
     *
     * This will result in the user being
     * redirected to a page showing the
     * tree's contents.
     *
     * @param treeId
     */
    const onTreeClick = (treeId) => history.push(`/editor?treeId=${treeId}`);

    /**
     * To be called when the "+" is clicked to create a new tree.
     *
     * This will result in the modal being shown requesting a name for the new tree.
     */
    const onPlusClick = () => setModal(true);

    /**
     * To be called on the creation of a new tree.
     *
     * This will result in the modal being closed.
     */
    const onNameSubmit = () => {
        setUpdate(prev => prev + 1);
        setModal(false);
    }

    /**
     * Maps each tree retrieved from the database to an equivalent JSX element.
     *
     * @returns {*[]} array of JSX elements representing the trees from the database.
     */
    const mapItems = () => {
        const items = [];

        for (const tree of trees) {
            items.push(
                <div className={styles.treeContainer}>
                    <h1 onClick={() => onTreeClick(tree._id)} className={styles.name} key={tree._id}>{tree.displayName}</h1>
                    <button className={styles.button} onClick={() => onDeleteTree(tree._id)}>Delete</button>
                </div>
            )
        }
        return items;
    }

    const onDeleteTree = async (treeId) => {
        await fetch(`http://localhost:8080/api/trees/${treeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        /* Update the feed */
        setUpdate(prevState => prevState + 1);
    };

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
        void getData();
    }, [update])

    return (
        <>
            <Navbar hidden={modal}/>
            <div className={styles.container}>

                {/* Open the modal if the state indicates such */}
                {modal && <Modal onX={() => setModal(false)} onSubmit={onNameSubmit}/>}
                <div className={styles.treesContainer}>

                    {/* Render a list of the trees retrieved from the DB */}
                    {mapItems()}
                    <div onClick={onPlusClick} className={styles.treeContainerTwo}>
                        <h1 className={styles.plus}>+</h1>
                    </div>
                </div>
            </div>
        </>
    )
};
export default Feed;
