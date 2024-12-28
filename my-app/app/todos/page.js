
const fetchTodos = async () => {
    const response = await fetch(`http://localhost:5000/todos`, {cache: "no-store"})
    const data = await response.json()
    return data

}

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