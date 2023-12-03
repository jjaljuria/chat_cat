export default function home({user, conversations}) {
  return (
  <div className="container-fluid min-vh-100">
    <header className="row border align-items-center height-header" >
      <section className="cal-12 col-sm-4 col-md-4 border-end">
        <h3 className="text-truncate">{user?.nickname}</h3>
      </section>
    </header>

    <div className="row height-chat">
      <aside className="col-12 col-sm-4 col-md-4 border p-0">
        <section className="border-bottom p-2">
          <form className="input-group" id="searchForm">
            <div className="input-group-prepend">
              <span className="input-group-text rounded-end-0 bg-white h-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </span>
            </div>
            <input type="search" className="form-control shadow-none border border-start-0 ps-0 rounded-end" placeholder="Username" aria-label="Username" aria-describedby="search" id="search" autoComplete="off" />
          
          <ul id="listUsers" className="list-group position-absolute top-100 rounded"></ul>
          </form>
        </section>

        <ul className="list-group">
        {/* {{#each conversations as |conversation|}}
          {{#each conversation.users as |user|}}
            {{#notEquals @root.user.id user.id}}
              <li className="list-group-item list-group-item-action rounded-0" onclick="connectTo('{{conversation.id}}')">
                {{user.nickname}}
              </li>
            {{/notEquals}}
          {{/each}}
        {{/each}} */}
        </ul>
      </aside>

      {/* chat */}
    </div>
  </div>  
  )
}
