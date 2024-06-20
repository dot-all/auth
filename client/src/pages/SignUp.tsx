import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Añadir objeto genérico
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async(e: React.FormEvent) => {
    try {
      setError(false);
      setLoading(true);
      e.preventDefault();
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      setLoading(false);

      if (data.success === false) {
        throw error;
      }

    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
        <input type="text" placeholder="Username" id="username" className="bg-slate-100 p-3" onChange={handleChange}/>
        <input type="email" placeholder="Email" id="email" className="bg-slate-100 p-3" onChange={handleChange}/>
        <input type="password" placeholder="Password" id="password" className="bg-slate-100 p-3" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">{ loading ? "Loading..." : "Sign Up" }</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in" >
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">{ error && "Something went wrong" }</p>
    </div>
  )
}
