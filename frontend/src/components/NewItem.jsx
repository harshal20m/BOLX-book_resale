import { useState } from "react";
import axiosInstance from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewItem() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [images, setImages] = useState([]);
	const [imagePreviews, setImagePreviews] = useState([]);
	const [status, setStatus] = useState("available");
	const [category, setCategory] = useState("Electronics");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("token");
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("price", price);
		formData.append("status", status);
		formData.append("category", category);

		// Append all selected images
		images.forEach((image) => {
			formData.append("images", image);
		});

		await axiosInstance.post("/items", formData, {
			headers: {
				Authorization: `${token}`,
				"Content-Type": "multipart/form-data",
			},
		});
		toast.success("Add Posted Successfully !");

		navigate("/");
	};

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);

		const filePreviews = files.map((file) => URL.createObjectURL(file));
		setImagePreviews(filePreviews);
	};

	return (
		<div className="w-full bg-gradient-180 p-4 pb-28">
			<h1 className="text-2xl font-bold text-center text-white mb-4">Create New Add</h1>
			<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-inherit">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className="border p-2 w-full rounded-lg bg-white border-slate-200 text-black"
					required
				/>
				<input
					type="text"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className="border p-2 w-full mt-4 rounded-lg bg-white border-slate-200 text-black "
					required
				/>
				<input
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					className="border p-2 w-full mt-4 rounded-lg bg-white border-slate-200 text-black"
					required
				/>

				<input
					type="file"
					multiple
					onChange={handleImageChange}
					className="border p-2 w-full mt-4 rounded-lg bg-white border-slate-200 text-black"
					required
				/>

				{/* Image Previews */}
				<div className="mt-4 flex flex-wrap gap-2 rounded-lg ">
					{imagePreviews.map((src, index) => (
						<img
							key={index}
							src={src}
							alt={`Preview ${index}`}
							className="w-24 h-24 object-cover border rounded-lg"
						/>
					))}
				</div>

				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					className="border p-2 w-full mt-4 rounded-lg bg-white border-slate-200 text-black"
				>
					<option value="available">Available</option>
					<option value="unavailable">Unavailable</option>
				</select>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="border p-2 w-full mt-4 rounded-lg bg-white border-slate-200 text-black"
				>
					<option value="Electronics">Electronics</option>
					<option value="Home Appliances">Home Appliances</option>
					<option value="Fitness">Fitness</option>
					<option value="Gadgets">Gadgets</option>
					<option value="Clothing & Accessories">Clothing & Accessories</option>
					<option value="Toys & Games">Toys & Games</option>
					<option value="Kitchen & Dining">Kitchen & Dining</option>
					<option value="Office Supplies">Office Supplies</option>
					<option value="Outdoor & Garden">Outdoor & Garden</option>
					<option value="Sports & Recreation">Sports & Recreation</option>
					<option value="Books & Media">Books & Media</option>
					<option value="Furniture">Furniture</option>
				</select>
				<button type="submit" className="bg-blue-700 text-white p-2 mt-4 rounded-lg">
					Create Item
				</button>
			</form>
		</div>
	);
}

export default NewItem;
