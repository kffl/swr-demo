import logo from "./logo.svg";
import "./App.css";
import useSWR from "swr";

const fetcher = (url) =>
    fetch("http://localhost:5000" + url).then((r) => r.json());

function App() {
    const { data, error, mutate } = useSWR('/', fetcher);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p
                    onClick={() => {
                        const todoName = Math.random()
                            .toString(36)
                            .substring(7);
                        mutate(
                            [
                                ...data,
                                { id: Date.now().toString(), name: todoName },
                            ],
                            false
                        );
                        fetch("http://localhost:5000", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name: todoName,
                            }),
                        }).then(() => {
                            mutate();
                        });
                    }}
                >
                    Add todo
                </p>
                {!data && !error && <p>Loading...</p>}
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
