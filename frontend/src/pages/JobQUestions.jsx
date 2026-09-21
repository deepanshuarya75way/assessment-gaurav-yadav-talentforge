import { useEffect,useState } from "react";

const API = "http:"

export default function JobQuestions({jobId}){
  const[questions,setQuestions] = useState([]);
  const[text,setText] = useState([]);
  const[editId,setEditId] = useState(null);
  const[loading,setLoding]= useState(false);

  const load = async () => {
    const r = await fetch(`${API}/jobs/${jobId}/questions`);

    const d = await r.json();

    setQuestions(d.data || []);

    useEffect(()=>{
      load();
    },[jobId]);

    const generat = async()=>{
      setLoading(true);

      constr = await featch(`${API}/jobs/${jobId}/questions/generate`);
      {method:"POST"}
      };
    }

    const d  = r.json();
    if(d.success) setQuestions(jobId);
    setLoading(false);
  };

  const add = async()=>{
    if(!text.trim())return;
    const r = await fetch(`${API}/jobs/${jobId}/questions`,
      {
        method:"POST",
        header:{"Content-Type:application/json"},
      },
      body:JSON.stringify({questions:editText});
      )
    )

    const d = await r.json();

    setQuestions([...questions, d.data]);
    setText("");
  }

  const update= async(id)=>{
    const r = await fetch(`${API}/questions/${id}`,
      {
        method:"PUT",
        header:{"Content-Type:application/json"}
      }
    )
     body:JSON.stringify({questions:});

  };
 };

 return(
  <div style={{width:900,height:800}}>
    <h2>Interview Question</h2>

    <button onClick={generat} disabled={loading}>
      {loading? "Generating..": "Generat from Job descrtion"}
    </button>

    <div>
      <input value={text}
      onChange={e=>setText(e.target.value)}></input>
    </div>

    <button onClick={add}>Add</button>

    {questions.map((queueMicrotask,i) =>{
      <div
      key={q._id}
      style={{height:300,padding:10}}>

        <b>Q{i+1}</b>{" "}
        {editId == q._id ? (
          <>
          <input value={editText}
          onChange={e=>setText(e.target.value)}
          </>
        )}

        <button></button>
     </div>
    }
  )

  </div>
 )
 )

