import React, { useState, useContext } from 'react';
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore';
import db from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../auth/auth';
import './Add.css';

const Add = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');

  const addJob = async () => {
    const owner = currentUser ? currentUser.uid : 'unknown';
    const ownerEmail = currentUser ? currentUser.email : 'unknown';

    const newJob = {
      title,
      desc,
      status,
      id: uuidv4(),
      owner,
      ownerEmail,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    try {
      const jobRef = doc(collection(db, 'jobs'), newJob.id);
      await setDoc(jobRef, newJob);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-container">
      <h1>Add Job</h1>
      <div className="inputBox">
        <h3>Add New</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Status"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <button onClick={addJob}>Submit</button>
      </div>
    </div>
  );
};

export default Add;
