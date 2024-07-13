import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createComment } from '../../../services/operation/courseDetails'; // Import your createComment action
import { useEffect } from 'react';
import { fetchDiscussionDetails } from '../../../services/operation/courseDetails'; // Import your fetchDiscussionDetails action

const AddCommentSection = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData } = useSelector((state) => state.viewCourse);

  const [message, setMessage] = useState('');
  const [discussions, setDiscussions] = useState({});
  
  console.log("subSectionnn", subSectionId);

  // Fetch discussion details on component mount
  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const discussionsData = {};
        
        // Fetch discussion details for the specified subSectionId
        const response = await fetchDiscussionDetails(subSectionId);
        console.log("response",response);
        const discussionDetails = response.data.discussions;

        // Store the discussion details in discussionsData
        discussionsData[subSectionId] = discussionDetails;

        // Set discussionsData state
        setDiscussions(discussionsData);
      } catch (error) {
        console.error("Error fetching discussions:", error);
      }
    };

    // Call fetchDiscussions when subSectionId changes
    if (subSectionId) {
      fetchDiscussions();
    }
  }, [subSectionId]);

  console.log("discussions", discussions);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const data = {
        subsectionId: subSectionId, // Use the current subSectionId
        message,
      };
      const success = await createComment(data, token);
      if (success) {
        setMessage('');
        // Optionally, refetch the discussions to include the new comment
        const updatedDiscussionDetails = await fetchDiscussionDetails(subSectionId);
        setDiscussions((prevDiscussions) => ({
          ...prevDiscussions,
          [subSectionId]: updatedDiscussionDetails.data.discussions,
        }));
      }
    } catch (error) {
      console.log("Error adding discussion:", error);
    }
  };

  return (
    <div>
      <h2>Add Comment Section</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your comment..."
        />
        <button type="submit">Add Comment</button>
      </form>
      <hr />
      <h2>Comments</h2>
      <div>
        {courseSectionData.map((section) => (
          section.subSection.map((subsection) => (
            <div key={subsection._id}>
              <h3>{subsection.title}</h3>
              {discussions[subsection._id] ? (
                discussions[subsection._id].map((discussion) => (
                  <div key={discussion._id}>
                    <p>{discussion.message}</p>
                    <p>By: {discussion.user.firstName} {discussion.user.lastName} ({discussion.user.email})</p>
                  </div>
                ))
              ) : (
                <p>Loading discussions...</p>
              )}
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default AddCommentSection;