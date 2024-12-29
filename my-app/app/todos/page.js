
const fetchTodos = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, { cache: "no-store" });
    const data = await response.json();
    console.log("Fetched Data:", data); // Check the structure of the data
    return data.todos;
};


export default async function Todos() {
    const todos = await fetchTodos()
    return (
        <div> 
            <h1>Todos</h1>
            <ul>
                {todos?.map((todo) => (
                    <li key={todo?.id}>{todo?.title}</li>
                ))} 
            </ul>
        </div>
    )
}