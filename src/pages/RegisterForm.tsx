import React, { FormEvent, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Database/firabase"; // Adjusted import path
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Helper to validate form
    const validateForm = () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!", { position: "top-center" });
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);

            // Create a new user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user information in Firestore
            await setDoc(doc(db, "Users", user.uid), {
                email: email,
                username: username,
                createdAt: new Date().toISOString(), // Optional: add a timestamp
            });

            toast.success("User registered successfully!", { position: "top-center" });
            navigate("/Home");

        } catch (error: any) {
            // Handle Firebase errors
            const errorMessage = error.message || "Something went wrong. Please try again.";
            toast.error(errorMessage, { position: "top-center" });
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="max-w-md w-full p-8 bg-white shadow-lg rounded-lg space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>

                <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoComplete="username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoComplete="username"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoComplete="new-password"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoComplete="new-password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-3 rounded-md ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white font-semibold`}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="text-center text-gray-600">
                    Already have an account?
                    <Link to="/Login" className="text-blue-500 hover:underline"> login</Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
