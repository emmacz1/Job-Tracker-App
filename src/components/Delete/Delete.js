import React, { useState, useEffect, useContext } from 'react';
import { doc, deleteDoc, onSnapshot, collection } from 'firebase/firestore';
import db from '../../firebase';
import { AuthContext } from '../../auth/auth';
import './Delete.css';

const Delete = () => {
  const { currentUser } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const collectionRef = collection(db, 'jobs');
      const unsub = onSnapshot(collectionRef, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setJobs(items);
      });
      return () => unsub();
    }
  }, [currentUser]);

  const deleteJob = async (job) => {
    try {
      const jobRef = doc(collection(db, 'jobs'), job.id);
      await deleteDoc(jobRef);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="delete-container">
      <h1>Delete Job</h1>
      {jobs.map((job) => (
        <div className="job" key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.desc}</p>
          <p>{job.status}</p>
          <p>{job.ownerEmail}</p>
          <button onClick={() => deleteJob(job)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Delete;
