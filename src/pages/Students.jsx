import { useEffect, useState } from "react";
import axios from "axios";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [section, setSection] = useState("BSIT 3-1");
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("Loading students...");
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let ignore = false;
    axios.get("/api/students")
      .then(({ data }) => {
        if (!ignore) {
          setStudents(data);
          setStatus("Students loaded.");
        }
      })
      .catch(() => {
        if (!ignore) setStatus("Load failed. Check Express and refresh.");
      })
      .finally(() => { if (!ignore) setBusy(false); });
    return () => { ignore = true; };
  }, []);

  function resetForm() {
    setName("");
    setSection("BSIT 3-1");
    setEditingId(null);
  }

  async function saveStudent(event) {
    event.preventDefault();
    setBusy(true);
    try {
      const body = { name, section };
      if (editingId) {
        const { data } = await axios.put(`/api/students/${editingId}`, body);
        setStudents((prev) => prev.map((s) => s._id === data._id ? data : s));
      } else {
        const { data } = await axios.post("/api/students", body);
        setStudents((prev) => [data, ...prev]);
      }
      resetForm();
      setStatus("Student saved.");
    } catch (err) {
      setStatus(err.response?.data?.error || "Save failed.");
    } finally { setBusy(false); }
  }

  async function deleteStudent(id) {
    if (!window.confirm("Delete this student?")) return;
    setBusy(true);
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      if (editingId === id) resetForm();
      setStatus("Student deleted.");
    } catch (err) {
      setStatus(err.response?.data?.error || "Delete failed.");
    } finally { setBusy(false); }
  }

  return (
    <main>
      <h1>Students</h1>
      <form onSubmit={saveStudent}>
        <label htmlFor="student-name">Name</label>
        <input id="student-name" value={name} required maxLength={80}
          disabled={busy} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="student-section">Section</label>
        <input id="student-section" value={section} required maxLength={40}
          disabled={busy} onChange={(e) => setSection(e.target.value)} />
        <button disabled={busy} type="submit">
          {editingId ? "Update student" : "Add student"}
        </button>{" "}
        {editingId && <button type="button" onClick={resetForm}
          disabled={busy}>Cancel edit</button>}
      </form>
      <p role="status">{status}</p>
      {!busy && students.length === 0 && <p>No students to display.</p>}
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            {student.name} - {student.section}{" "}
            <button type="button" disabled={busy} onClick={() => {
              setEditingId(student._id);
              setName(student.name);
              setSection(student.section);
            }}>Edit</button>{" "}
            <button type="button" disabled={busy}
              onClick={() => deleteStudent(student._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
