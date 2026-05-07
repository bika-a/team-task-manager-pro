import {useState} from "react";
import axios from "axios";

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  const login = async ()=>{
    if(!email || !password){
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    setError("");
    try{
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5001";
const res = await axios.post(`${apiUrl}/api/auth/login`,{email,password});
      localStorage.setItem("token",res.data.token);
      window.location="/dashboard";
    }catch(err){
      setError(err.response?.data || "Invalid credentials");
    }finally{
      setLoading(false);
    }
  }

  return(
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        padding: "20px"
      }}>
        {/* Logo & Title */}
        <div style={{textAlign: "center", marginBottom: "40px"}}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "white",
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }}>
            <span style={{fontSize: "40px", fontWeight: "bold", color: "#1e3a8a"}}>T</span>
          </div>
          <h1 style={{
            color: "white",
            fontSize: "32px",
            fontWeight: "700",
            margin: "0 0 8px 0"
          }}>Task Manager Pro</h1>
          <p style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "16px",
            margin: 0
          }}>Sign in to continue to your workspace</p>
        </div>

        {/* Login Card */}
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "40px",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)"
        }}>
          <h2 style={{
            color: "#1f2937",
            fontSize: "24px",
            fontWeight: "600",
            margin: "0 0 30px 0",
            textAlign: "center"
          }}>Welcome Back</h2>

          {/* Email Input */}
          <div style={{marginBottom: "20px"}}>
            <label style={{
              display: "block",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px"
            }}>Email Address</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={e=>e.target.style.borderColor="#3b82f6"}
              onBlur={e=>e.target.style.borderColor="#e5e7eb"}
            />
          </div>

          {/* Password Input */}
          <div style={{marginBottom: "24px"}}>
            <label style={{
              display: "block",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "8px"
            }}>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 16px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                outline: "none",
                transition: "all 0.2s",
                boxSizing: "border-box"
              }}
              onFocus={e=>e.target.style.borderColor="#3b82f6"}
              onBlur={e=>e.target.style.borderColor="#e5e7eb"}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: "#fef2f2",
              color: "#dc2626",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "20px",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span>⚠️</span> {error}
            </div>
          )}

          {/* Login Button */}
          <button 
            onClick={login}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "16px",
              fontWeight: "600",
              color: "white",
              background: loading ? "#9ca3af" : "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
              border: "none",
              borderRadius: "12px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Demo Credentials */}
          <div style={{
            marginTop: "30px",
            padding: "20px",
            background: "#f8fafc",
            borderRadius: "12px"
          }}>
            <p style={{
              color: "#64748b",
              fontSize: "12px",
              fontWeight: "600",
              margin: "0 0 12px 0",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>Demo Credentials</p>
            <div style={{display: "grid", gap: "8px"}}>
              <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px"}}>
                <span style={{color: "#64748b"}}>Admin:</span>
                <span style={{color: "#1e3a8a", fontWeight: "500"}}>admin@test.com / admin123</span>
              </div>
              <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px"}}>
                <span style={{color: "#64748b"}}>Member:</span>
                <span style={{color: "#1e3a8a", fontWeight: "500"}}>john@test.com / john123</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.6)",
          fontSize: "14px",
          marginTop: "30px"
        }}>
          © 2024 Task Manager Pro. All rights reserved.
        </p>
      </div>
    </div>
  )
}
