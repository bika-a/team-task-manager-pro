import {useEffect,useState} from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001";

export default function Dashboard(){
  const [tasks,setTasks]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [newTask,setNewTask]=useState({title:"", description:"", status:"Pending"});
  const [showAddModal,setShowAddModal]=useState(false);

  const token = localStorage.getItem("token");

  useEffect(()=>{
    fetchTasks();
  },[]);

  const fetchTasks = async ()=>{
    setLoading(true);
    try{
const res = await axios.get(`${apiUrl}/api/tasks`,{headers:{authorization:token}});
      setTasks(res.data);
    }catch(err){
      setError("Failed to load tasks");
    }finally{
      setLoading(false);
    }
  }

  const handleAddTask = async ()=>{
    if(!newTask.title) return;
    try{
await axios.post(`${apiUrl}/api/tasks`,newTask,{headers:{authorization:token}});
      setNewTask({title:"", description:"", status:"Pending"});
      setShowAddModal(false);
      fetchTasks();
    }catch(err){
      setError("Failed to add task");
    }
  }

  const getStatusColor = (status)=>{
    if(status==="Done") return {bg: "#dcfce7", text: "#16a34a", border: "#22c55e"};
    if(status==="Pending") return {bg: "#fee2e2", text: "#dc2626", border: "#ef4444"};
    return {bg: "#ffedd5", text: "#ea580c", border: "#f97316"};
  }

  const handleLogout = ()=>{
    localStorage.removeItem("token");
    window.location="/";
  }

  return(
    <div style={{
      minHeight: "100vh",
      background: "#f1f5f9",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 20px rgba(30, 58, 138, 0.3)"
      }}>
        <div style={{display: "flex", alignItems: "center", gap: "12px"}}>
          <div style={{
            width: "48px",
            height: "48px",
            background: "white",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{fontSize: "24px", fontWeight: "bold", color: "#1e3a8a"}}>T</span>
          </div>
          <h1 style={{color: "white", margin: 0, fontSize: "24px", fontWeight: "700"}}>Task Manager Pro</h1>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s"
          }}
        >Logout</button>
      </header>

      {/* Main Content */}
      <div style={{padding: "40px", maxWidth: "1200px", margin: "0 auto"}}>
        {/* Stats Cards */}
        <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px"}}>
          <div style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <p style={{color: "#64748b", margin: "0 0 8px 0", fontSize: "14px"}}>Total Tasks</p>
            <p style={{color: "#1e3a8a", margin: 0, fontSize: "32px", fontWeight: "700"}}>{tasks.length}</p>
          </div>
          <div style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <p style={{color: "#64748b", margin: "0 0 8px 0", fontSize: "14px"}}>Pending</p>
            <p style={{color: "#f97316", margin: 0, fontSize: "32px", fontWeight: "700"}}>
              {tasks.filter(t=>t.status==="Pending").length}
            </p>
          </div>
          <div style={{
            background: "white",
            padding: "24px",
            borderRadius: "16px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
          }}>
            <p style={{color: "#64748b", margin: "0 0 8px 0", fontSize: "14px"}}>Completed</p>
            <p style={{color: "#22c55e", margin: 0, fontSize: "32px", fontWeight: "700"}}>
              {tasks.filter(t=>t.status==="Done").length}
            </p>
          </div>
        </div>

        {/* Tasks Section */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
        }}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px"}}>
            <h2 style={{color: "#1f2937", margin: 0, fontSize: "24px", fontWeight: "600"}}>My Tasks</h2>
            <button 
              onClick={()=>setShowAddModal(true)}
              style={{
                padding: "12px 24px",
                background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500"
              }}
            >+ Add New Task</button>
          </div>

          {loading ? (
            <div style={{textAlign: "center", padding: "60px", color: "#64748b"}}>Loading tasks...</div>
          ) : error ? (
            <div style={{textAlign: "center", padding: "60px", color: "#dc2626"}}>{error}</div>
          ) : tasks.length === 0 ? (
            <div style={{textAlign: "center", padding: "60px", color: "#64748b"}}>
              <p style={{fontSize: "48px", margin: "0 0 20px 0"}}>📋</p>
              <p style={{fontSize: "18px"}}>No tasks found. Create your first task!</p>
            </div>
          ) : (
            <div style={{display: "grid", gap: "16px"}}>
              {tasks.map(t=>{
                const colors = getStatusColor(t.status);
                return (
                  <div key={t._id} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 24px",
                    background: colors.bg,
                    borderRadius: "12px",
                    borderLeft: `4px solid ${colors.border}`,
                    transition: "transform 0.2s, boxShadow 0.2s"
                  }}>
                    <div>
                      <h3 style={{
                        margin: "0 0 8px 0",
                        color: "#1f2937",
                        fontSize: "18px",
                        fontWeight: "600"
                      }}>{t.title}</h3>
                      <p style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: "14px"
                      }}>{t.description}</p>
                    </div>
                    <span style={{
                      padding: "8px 16px",
                      background: colors.text,
                      color: "white",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>{t.status}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000
        }}>
          <div style={{
            background: "white",
            borderRadius: "16px",
            padding: "30px",
            width: "100%",
            maxWidth: "500px"
          }}>
            <h3 style={{margin: "0 0 20px 0", fontSize: "20px"}}>Add New Task</h3>
            <input 
              placeholder="Task title"
              value={newTask.title}
              onChange={e=>setNewTask({...newTask, title: e.target.value})}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                marginBottom: "12px",
                fontSize: "14px"
              }}
            />
            <textarea 
              placeholder="Description"
              value={newTask.description}
              onChange={e=>setNewTask({...newTask, description: e.target.value})}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                marginBottom: "12px",
                fontSize: "14px",
                minHeight: "80px"
              }}
            />
            <select
              value={newTask.status}
              onChange={e=>setNewTask({...newTask, status: e.target.value})}
              style={{
                width: "100%",
                padding: "12px",
                border: "2px solid #e5e7eb",
                borderRadius: "8px",
                marginBottom: "20px",
                fontSize: "14px"
              }}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div style={{display: "flex", gap: "12px"}}>
              <button 
                onClick={()=>setShowAddModal(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#f1f5f9",
                  color: "#64748b",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >Cancel</button>
              <button 
                onClick={handleAddTask}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "#1e3a8a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px"
                }}
              >Add Task</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
