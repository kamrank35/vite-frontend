import { useState } from "react";
function Dashboard() {
    const [counter, setCounter] = useState(0);
    
    return (
        <div>
            <h1>Dashboard Page</h1>
            <h2>{counter}</h2>
            <button className="btn btn-dark" onClick={() => setCounter(counter+1)}>Increase</button>
            <button className="btn btn-dark" onClick={() => setCounter(counter-1)}>Decrease</button>
        </div>
    )
}

export default Dashboard;