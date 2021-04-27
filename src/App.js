import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

//const fetcher = url => fetch("http://localhost:5000" + url).then(r => r.json())

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("http://localhost:5000").then(async (res) => {
            const d = await res.json();
            setData(d);
            setLoading(false);
        });
    }, []);
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p
                    onClick={() => {
                        fetch("http://localhost:5000", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: Math.random().toString(36).substring(7),
                            }),
                        }).then();
                    }}
                >
                    Add todo
                </p>
                {loading && <p>Loading...</p>}
                {data && (
                    <ol>
                        {data.map((todo) => (
                            <li key={todo.id}>{todo.name}</li>
                        ))}
                    </ol>
                )}
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
            </header>
        </div>
    );
}

export default App;
