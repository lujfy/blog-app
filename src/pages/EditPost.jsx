import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';

function EditPost() {
    const {id} = useParams();
    const [ title , setTitle ] = useState('')
    const [ summary , setSummary ] = useState('')
    const [ content , setContent ] = useState('')
    const [ file , setFile ] = useState('')
    const [cover , setCover ] = useState('')
    const [ redirect , setRedirect ] = useState(false)

    useEffect(() => {
      fetch(`http://localhost:4000/post/`+id)
      .then(respone => {
        respone.json().then(postInfo => {
          setTitle(postInfo.title) ;
          setContent(postInfo.content) ;
          setSummary(postInfo.summary) ;

        })
      })
    } , [])

    async function updatePost(ev) {
      ev.preventDefault();
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('content', content);
      data.set('id', id);
      if (file?.[0]) {
        data.set('file', file?.[0]);
      }
      const response = await fetch(`${URL}/post`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });
      if (response.ok) {
        setRedirect(true);
      }

    }
    
    if (redirect) {
      return <Navigate to={'/post/'+id} />
    }


    return (
        <form onSubmit={updatePost}>
            <input 
                  type='title' 
                  placeholder='Title'
                  value={title}
                  onChange={ev => setTitle(ev.target.value)}
                  />
            <input 
                  type='summary' 
                  placeholder='Summary'
                  value={summary}
                  onChange={ev => setSummary(ev.target.value)}
                  />
    
    
            <input type='file'  onChange={ev => setFile(ev.target.files)}/>
    
            <Editor onChange={setContent} value={content}/>
            <button style={{marginTop : '5px'}}>Update Post</button>
            
        </form>
      )
}

export default EditPost
