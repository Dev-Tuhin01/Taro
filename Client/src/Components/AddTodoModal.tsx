import { useEffect, useState } from "react";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";
import api from "../API/axiosAPI"; // Adjust if needed

interface AddTodoModalProps {
  isLoaded: boolean;
  setIsLoaded: (val: boolean) => void;
}

interface Child {
  _id: string;
  userName: string;
}

const AddTodoModal = ({ isLoaded, setIsLoaded }: AddTodoModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bounty: 0,
    childName: "",
  });

  const [children, setChildren] = useState<Child[]>([]);
  const [loadingChildren, setLoadingChildren] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const res = await api.get("/misc/children");
        setChildren(res.data);
      } catch (err) {
        toast.error("Failed to load children");
      } finally {
        setLoadingChildren(false);
      }
    };

    if (isLoaded) fetchChildren();
  }, [isLoaded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "bounty" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/chore", formData);
      toast.success("Chore created!");
      setIsLoaded(false);
      window.location.reload(); // ✅ Reload the page
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to create chore");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-full bg-Accent-Primary/90 ${
        isLoaded ? "block" : "hidden"
      } backdrop-blur-sm text-Text-Ligth z-40 flex justify-center items-center`}
    >
      <div className="bg-Accent-Secondary text-Text-Ligth rounded p-6 w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-black"
          onClick={() => setIsLoaded(false)}
        >
          <CircleX />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create Chore</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="title"
            placeholder="Chore title"
            value={formData.title}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded"
            rows={3}
            required
          />
          <input
            type="number"
            name="bounty"
            placeholder="Bounty (in taroDollars)"
            value={formData.bounty}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <select
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          >
            <option value="">Select child</option>
            {loadingChildren ? (
              <option disabled>Loading...</option>
            ) : (
              children.map((child) => (
                <option key={child._id} value={child.userName}>
                  {child.userName}
                </option>
              ))
            )}
          </select>

          <button
            type="submit"
            className="bg-Accent-Primary text-white px-4 py-2 rounded hover:bg-opacity-80"
          >
            Create Chore
          </button>
          <button
          className="bg-Accent-Secondary text-white px-4 py-2 rounded hover:underline"
          onClick={() => setIsLoaded(false)}
        >
          I'm Feeling Lucky
        </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
