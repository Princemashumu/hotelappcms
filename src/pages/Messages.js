import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure the path is correct

const Messages = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState(new Set()); // Track selected emails
  const [message, setMessage] = useState(''); // To store success/error messages

  // Fetch emails from Firestore
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'emails'));
        if (!querySnapshot.empty) {
          const emailsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            isRead: false, // Add isRead property
          }));
          setEmails(emailsData);
        } else {
          console.error('No emails found in the collection');
        }
      } catch (error) {
        console.error('Error fetching emails: ', error);
      }
    };

    fetchEmails();
  }, []);

  // Function to handle email click
  const handleEmailClick = async (email) => {
    if (!email.isRead) {
      // Mark email as read in Firestore
      const emailRef = doc(db, 'emails', email.id);
      await updateDoc(emailRef, { isRead: true });
    }
    setSelectedEmail(email);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (emailId) => {
    const updatedSelectedEmails = new Set(selectedEmails);
    if (updatedSelectedEmails.has(emailId)) {
      updatedSelectedEmails.delete(emailId); // Uncheck
    } else {
      updatedSelectedEmails.add(emailId); // Check
    }
    setSelectedEmails(updatedSelectedEmails);
  };

  // Function to handle email deletion
  const handleDeleteEmails = async () => {
    try {
      for (const emailId of selectedEmails) {
        await deleteDoc(doc(db, 'emails', emailId));
      }
      setMessage('Selected emails deleted successfully.'); // Success message
      setSelectedEmails(new Set()); // Clear selected emails after deletion
      // Refetch emails after deletion
      const updatedEmails = await getDocs(collection(db, 'emails'));
      const emailsData = updatedEmails.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        isRead: false,
      }));
      setEmails(emailsData);
    } catch (error) {
      setMessage('Error deleting emails: ' + error.message); // Error message
    }
  };

  // Function to handle reply action
  const handleReply = (email) => {
    // Implement your reply logic here
    console.log(`Replying to: ${email.name}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      <div className="w-1/3 bg-white shadow-md rounded p-4 mr-4">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        {message && <p className="text-green-600 mb-4">{message}</p>} {/* Message Display */}
        <button
          onClick={handleDeleteEmails}
          className="bg-red-500 text-white py-2 px-4 rounded mb-4"
        >
          Delete Selected Emails
        </button>

        {emails.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          <div className="grid grid-rows-1 gap-2">
            {emails.map((email) => (
              <div
                key={email.id}
                className={`flex items-center p-2 border border-black rounded mb-2 ${email.isRead ? 'bg-gray-200' : 'bg-white'}`} // Changed border color to black
              >
                <input
                  type="checkbox"
                  checked={selectedEmails.has(email.id)}
                  onChange={() => handleCheckboxChange(email.id)}
                  className="mr-2"
                />
                <div onClick={() => handleEmailClick(email)} className="flex-1 cursor-pointer">
                  <h2 className="font-bold">{email.name}</h2>
                  <p className="text-gray-600">{email.message.slice(0, 50)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right side panel for displaying selected email */}
      {selectedEmail && (
        <div className="w-2/3 bg-white shadow-md rounded p-6 relative">
          <button
            onClick={() => setSelectedEmail(null)}
            className="absolute top-2 right-2 text-red-500"
          >
            &times; {/* Close button */}
          </button>
          <h2 className="text-lg font-bold">{selectedEmail.name}</h2>
          <p>{selectedEmail.message}</p>
          <p className="text-gray-500">
            {new Date(selectedEmail.timestamp.seconds * 1000).toLocaleString()}
          </p>

          {/* Reply button */}
          <button
            onClick={() => handleReply(selectedEmail)}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Reply
          </button>
        </div>
      )}
    </div>
  );
};

export default Messages;
