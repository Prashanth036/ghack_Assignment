import React, { useState } from 'react';

const CommentForm = () => {
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to an API)

    console.log({
      comment,
      name,
      email,
      website,
      saveInfo,
    });

    // Reset form fields after submission
    setComment('');
    setName('');
    setEmail('');
    setWebsite('');
    setSaveInfo(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '20px auto' }}>
      <div>
        <label htmlFor="comment">Comment *</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          rows="4"
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label htmlFor="website">Website</label>
        <input
          type="url"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
          />
          Save my name, email, and website in this browser for the next time I comment.
        </label>
      </div>

      <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
