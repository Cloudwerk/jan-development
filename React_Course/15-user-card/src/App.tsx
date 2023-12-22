import "./user.css";
import user from "./assets/user.json";
import { UserCard } from "./UserCard";

function App() {
	return <UserCard name={user.name} age={user.age} phoneNumber={user.phoneNumber} address={user.address}></UserCard>;
}

export default App;
