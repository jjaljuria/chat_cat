/* eslint-disable react/prop-types */
import ItemUser from "./ItemUser"

export default function ListUser({userList}) {
    const users = userList.map(user => <ItemUser key={user.id} user={user} /> ) 
    return (
        <ul id="listUsers" className="list-group position-absolute top-100 rounded z-2">
            {users}
        </ul>
    )
}
