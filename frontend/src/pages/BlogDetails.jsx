// ...existing code...
import React from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import {useState,useEffect} from "react";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
function BlogDetails(){
    const {id} =useParams();
    const [blog,setBlog]=useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [replyText, setReplyText] = useState({});
    const decoded = jwtDecode(localStorage.getItem("token"));  
    const userId=decoded.name || "Anonymous";
    console.log(localStorage.getItem(id));
    useEffect(() => {
      axios.get(`/api/blogs/${id}`)
        .then(res => {
          setBlog(res.data.blog);
        })
        .catch(err => {
          console.error(err);
        });

      axios.get(`/api/comments?blogId=${id}`)
        .then(res => {
          setComments(res.data.comments || []);
        })
        .catch(err => {
          console.error(err);
        });
    }, [id]);

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try{
          const response = await axios.post('/api/comments',{
            blogId:id,
            userId:userId,
            text:newComment,
          })       
        setComments([response.data.comment, ...comments]);
        setNewComment("");
    } 
    catch(err){
      console.error(err);
    }
  };
  const handleReply = async (commentId) => {
    if (!replyText[commentId]?.trim()) return;
    try {
      const response = await axios.post('/api/comments/reply', {
      commentId,
      userId,
      text: replyText[commentId],
    });
    setComments(comments.map(c =>
      c.id === commentId
        ? { ...c, replies: [...c.replies, response.data.reply] }
        : c
    ));
    setReplyText({ ...replyText, [commentId]: "" });
  } catch (err) {
    console.error(err);
  }
};

const handleLikeComment = async (commentId) => {
  try {
    await axios.post('/api/comments/like', { commentId });
    setComments(comments.map(c =>
      c.id === commentId ? { ...c, likes: c.likes + 1 } : c
    ));
  } catch (err) {
    console.error(err);
  }
};

const handleLikeReply = async (commentId, replyIdx) => {
  try {
    const replyId = comments.find(c => c.id === commentId).replies[replyIdx].id;
    await axios.post('/api/comments/likeReply', { replyId });
    setComments(comments.map(c =>
      c.id === commentId
        ? {
            ...c,
            replies: c.replies.map((r, i) =>
              i === replyIdx ? { ...r, likes: r.likes + 1 } : r
            )
          }
        : c
    ));
  } catch (err) {
    console.error(err);
  }
};

    if(!blog){
        return <p>Loading...</p>;
    }
   return (
    <div style={styles.container}>
      <div>
        <h5>By {blog.author}</h5>
        <h1>{blog.title}</h1>
      </div>
      <div>
        <div><p>{blog.content.slice(0, 100)}...</p></div>
        <div>
          <img src={`/${blog.image}`} alt={blog.title} style={{width:"100%", maxHeight:"400px", objectFit:"cover", borderRadius:"8px"}} />
        </div>
        <div><p>{blog.content.slice(101,)}...</p></div>
      </div>
      {/* Future: Add Likes, Comments, Share */}
      <div style={styles.actions}>
        <button> Like</button>
        <button>Share</button>
      </div>
      
      {/* Comments Section */}
      <div style={styles.commentsSection}>
        <h3>Comments</h3>
        <div style={{display: "flex", gap: "1rem", marginBottom: "1rem"}}>
          <input
            type="text"
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={{flex: 1, padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc"}}
          />
          <button onClick={handleAddComment} style={{padding: "0.5rem 1rem", borderRadius: "8px", background: "#007bff", color: "#fff", border: "none"}}>Comment</button>
        </div>
        <ul style={{listStyle: "none", padding: 0}}>
          {comments.map((comment) => (
            <li key={comment.id} style={{marginBottom: "1.5rem", borderBottom: "1px solid #eee", paddingBottom: "1rem"}}>
               <div style={{fontWeight: "bold", marginBottom: "0.3rem"}}>
        {comment.userId}
      </div>
              <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
                <span>{comment.text}</span>
                <button onClick={() => handleLikeComment(comment.id)} style={{background: "none", border: "none", color: "#007bff", cursor: "pointer"}}>👍 {comment.likes}</button>
              </div>
              {/* Replies */}
              <ul style={{listStyle: "none", paddingLeft: "1.5rem"}}>
                {comment.replies.map((reply, idx) => (
                  <li key={idx} style={{marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "1rem"}}>
                    <span>{reply.text}</span>
                    <button onClick={() => handleLikeReply(comment.id, idx)} style={{background: "none", border: "none", color: "#007bff", cursor: "pointer"}}>👍 {reply.likes}</button>
                  </li>
                ))}
              </ul>
              <div style={{display: "flex", gap: "1rem", marginTop: "0.5rem"}}>
                <input
                  type="text"
                  value={replyText[comment.id] || ""}
                  onChange={e => setReplyText({...replyText, [comment.id]: e.target.value})}
                  placeholder="Reply..."
                  style={{flex: 1, padding: "0.3rem", borderRadius: "8px", border: "1px solid #ccc"}}
                />
                <button onClick={() => handleReply(comment.id)} style={{padding: "0.3rem 0.8rem", borderRadius: "8px", background: "#28a745", color: "#fff", border: "none"}}>Reply</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <Link to="/blogs">Back to blogs</Link>
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "2rem",
    maxWidth: "800px",
    margin: "auto",
  },
  content: {
    fontSize: "1.1rem",
    lineHeight: "1.6",
    marginBottom: "2rem",
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  commentsSection: {
    marginTop: "2rem",
    padding: "1rem",
    borderRadius: "8px",
    background: "#f9f9f9",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
};

export default BlogDetails;
