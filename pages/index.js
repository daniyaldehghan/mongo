import { use, useEffect, useState } from "react";

export default function Home() {
  const [users, setusers] = useState([]);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [edit, setedit] = useState("");
  // const [phone, setphone] = useState("");
  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((data) => setusers(data.data));
  }, []);
  const dataHandler = (id) => {
    fetch(`/api/data/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  const postHandler = async () => {
    const res = await fetch("/api/data", {
      method: "POST",
      body: JSON.stringify({ name, email, phone }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
  };
  const edithandler = (user) => {
    setedit(user._id);
    setemail(user.email);
  };
  const saveHandler = async (id) => {
    const res = await fetch(`api/data/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });
    const data=await res.json()
    setedit("")
    console.log(data)
  };
  return (
    <div>
      <input
        placeholder="Plase Enter Name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <input
        placeholder="Plase Enter Name"
        value={email}
        onChange={(e) => setemail(e.target.value)}
      />
      <input
        placeholder="Plase Enter Name"
        value={phone}
        onChange={(e) => setphone(e.target.value)}
      />
      <button onClick={postHandler}>Send</button>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <button onClick={() => dataHandler(user._id)}>Data</button>
            <button onClick={() => edithandler(user)}>Edit</button>
            {edit && edit === user._id ? (
              <div>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            ) : null}
            <button onClick={() => saveHandler(user._id)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}
