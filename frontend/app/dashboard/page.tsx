"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Dashboard() {

  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedEmail, setAssignedEmail] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {

  const res = await axios.get(
    "https://hairdrama-task-manager-production-ecd5.up.railway.app/tasks"
  );

  setTasks(res.data);
};

  const createTask = async () => {

  await axios.post(
    "https://hairdrama-task-manager-production-ecd5.up.railway.app/tasks",
    {
      title,
      description,
      creator_email:
        session?.user?.email,

      assigned_email:
        assignedEmail,
    }
  );

  fetchTasks();
};

const completeTask = async (
  id: string
) => {

  await axios.patch(
    `https://hairdrama-task-manager-production-ecd5.up.railway.app/tasks/${id}/complete`
  );

  fetchTasks();
};

  useEffect(() => {

    if (session) {

      axios.post(
        "https://hairdrama-task-manager-production-ecd5.up.railway.app/auth/google-user",
        {
          email: session.user?.email,
          name: session.user?.name,
        }
      );

    }

  }, [session]);

  useEffect(() => {

  axios
    .get("https://hairdrama-task-manager-production-ecd5.up.railway.app/users")
    .then((res) => {

      setUsers(res.data);

    })
    .catch((err) => {

      console.error(err);

    });

    }, []);

    useEffect(() => {
        fetchTasks();
    }, []);


  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold">

        Welcome {session?.user?.name}

      </h1>

      <div className="mt-10 space-y-4">

  <input
    type="text"
    placeholder="Title"
    value={title}
    onChange={(e) =>
      setTitle(e.target.value)
    }
    className="border p-2 block"
  />

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) =>
      setDescription(e.target.value)
    }
    className="border p-2 block"
  />

  <select
    value={assignedEmail}
    onChange={(e) =>
      setAssignedEmail(e.target.value)
    }
    className="border p-2 block"
  >

    <option>Select User</option>

    {users.map((user: any) => (

      <option
        key={user.id}
        value={user.email}
      >

        {user.email}

      </option>

    ))}

  </select>

  <button
  onClick={createTask}
  className="bg-black text-white px-4 py-2 rounded"
>

  Create Task

</button>

</div>

<div className="mt-10">

  {tasks.map((task: any) => (

    <div
      key={task.id}
      className="border p-4 mb-4"
    >

      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <p>

        Status:
        {task.status}

      </p>

      <button
        onClick={() =>
          completeTask(task.id)
        }
      >

        Complete

      </button>

    </div>

  ))}

</div>

    </div>
  );
}