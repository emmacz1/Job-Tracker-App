import React, { useState, useEffect, useContext } from 'react';
import { doc, updateDoc, onSnapshot, collection, serverTimestamp } from 'firebase/firestore';
import db from '../../firebase';
import { AuthContext } from '../../auth/auth';
import './Edit.css';

const Edit = ({ onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [status, setStatus] = useState('');

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

  const editJob = async () => {
    if (!currentJob) return;

    const updatedJob = {
      title,
      desc,
      status,
      lastUpdate: serverTimestamp(),
    };

    try {
      const jobRef = doc(collection(db, 'jobs'), currentJob.id);
      await updateDoc(jobRef, updatedJob);
      setIsEditing(false);
      setCurrentJob(null);
      setTitle('');
      setDesc('');
      setStatus('');
      onClose(); // Close the form after successful job edit
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (job) => {
    setIsEditing(true);
    setCurrentJob(job);
    setTitle(job.title);
    setDesc(job.desc);
    setStatus(job.status);
  };

  return (
    <div className="edit-container">
      <h1>Edit Job</h1>
      <div className="inputBox">
        <h3>{isEditing ? 'Edit Job' : 'Select Job to Edit'}</h3>
        {isEditing ? (
          <>
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
            <button onClick={editJob}>Update</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          jobs.map((job) => (
            <div className="job" key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.desc}</p>
              <p>{job.status}</p>
              <p>{job.ownerEmail}</p>
              <button onClick={() => handleEditClick(job)}>Edit</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Edit;
