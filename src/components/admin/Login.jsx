import React, { useState } from "react";import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = (e) => {
		e.preventDefault();
		if (username === "admin" && password === "admin123") {
			setError("");
			navigate("/admin");
		} else {
			setError("Invalid username or password");
		}
	};

	return (
		<div className="relative min-h-screen w-full bg-cover bg-center flex items-center justify-center">
			<div className="absolute inset-0 bg-black/30 backdrop-blur-md z-0"></div>

			<div className="relative z-10 bg-yellow-600 p-8 rounded-xl shadow-lg w-[90%] max-w-md">
				<h1 className="text-xl font-bold mb-4 text-center text-white">Login</h1>
				<form onSubmit={handleLogin}>
					<div className="mb-4">
						<label
							className="block text-white font-bold mb-2"
							htmlFor="email">
							Email
						</label>
						<input
							className="appearance-none border border-white/40 bg-white/30 backdrop-blur-md rounded-md py-2 px-3 text-white placeholder-white/70 leading-tight focus:outline-none focus:shadow-outline w-full"
							id="email"
							type="text"
							placeholder="Email"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="mb-4">
						<label
							className="block text-white font-bold mb-2"
							htmlFor="password">
							Password
						</label>
						<input
							className="appearance-none border border-white/40 bg-white/30 backdrop-blur-md rounded-md py-2 px-3 text-white placeholder-white/70 leading-tight focus:outline-none focus:shadow-outline w-full"
							id="password"
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					{error && <p className="text-red-300 text-sm mb-2">{error}</p>}

					<div className="flex items-center justify-between gap-8">
						<button
							className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit">
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
