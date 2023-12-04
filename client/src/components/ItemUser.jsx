export default function ItemUser({user}) {
    return (
        <li className="list-group-item list-group-item-action p-0">
            <a className="text-reset text-decoration-none py-2 px-3 d-block" draggable="false" onClick="connectTo('${user.id}')" >
                {user.nickname}
            </a>
        </li>
    )
}
