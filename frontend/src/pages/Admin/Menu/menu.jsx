import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // empty star
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // filled star

function Menu() {
  const [meals, setMeals] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mealToDelete, setMealToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editMeal, setEditMeal] = useState(null);
  const [editFileName, setEditFileName] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    img: '',
    category: '',
    fileName: '',
    price: ''
  });
  const [notification, setNotification] = useState({ show: false, message: '' });

  const fetchMeals = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/meal/menu/");
      const data = await response.json();
      // Backend uses `meal_id` field; use response as-is
      setMeals(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleAdd = async () => {
    // Validate all fields
    const errors = {};
    if (!newMeal.name.trim()) errors.name = 'Vui lòng nhập tên';
    if (!newMeal.description.trim()) errors.description = 'Vui lòng nhập mô tả';
    if (!newMeal.img.trim()) errors.img = 'Vui lòng chọn hình ảnh';
    if (!newMeal.category.trim()) errors.category = 'Vui lòng chọn loại món ăn';
    if (!newMeal.price.trim()) errors.price = 'Vui lòng nhập giá';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      // Ensure numeric price and robust response handling (MySQL backend may return created object differently)
      const payload = { ...newMeal, price: newMeal.price === '' ? null : Number(newMeal.price) };

      const response = await fetch("http://localhost:3000/api/meal/create_meal/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const created = data.meal ?? data;
      const normalizedCreated = created ? { ...created, meal_id: created.meal_id } : created;
      setMeals(prev => [...prev, normalizedCreated]);
      setShowAddModal(false);
      setNewMeal({ name: '', description: '', img: '', category: '', fileName: '', price: '' });
      setValidationErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleFileReceive = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
        setValidationErrors(prev => ({
            ...prev,
            img: 'File tải lên không hợp lệ, vui lòng chọn hình ảnh!' // <-- Đổi thông báo ở đây
        }));
        return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tokyobites-upload');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dqxeupx0u/image/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (response.ok && data.secure_url) {
            setNewMeal(prev => ({
                ...prev,
                img: data.secure_url,
                fileName: file.name
            }));
            setValidationErrors(prev => ({
                ...prev,
                img: ''
            }));
        } else {
            setValidationErrors(prev => ({
                ...prev,
                img: data.error?.message || 'Tải ảnh thất bại. Vui lòng thử lại.'
            }));
        }
    } catch (error) {
        setValidationErrors(prev => ({
            ...prev,
            img: 'Tải ảnh thất bại. Vui lòng thử lại.'
        }));
    }
  };
  const handleDelete = async (id) => {
    const meal = meals.find(m => (m.meal_id ?? m.id ?? m._id) === id);
    setMealToDelete(meal);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const id = mealToDelete.meal_id ?? mealToDelete.id ?? mealToDelete._id;
      // Keep endpoint, but backend may also accept `/api/meal/${id}` — adjust server if needed
      const response = await fetch(`http://localhost:3000/api/meal/del_meal/${id}`, {
        method: "DELETE"
      });
      if (response.ok) {
        setMeals(meals.filter(meal => (meal.meal_id) !== id));
        setShowDeleteModal(false);
        setMealToDelete(null);
      } else {
        console.error("Failed to delete meal");
      }
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMeal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditFileReceive = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'tokyobites-upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dqxeupx0u/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.secure_url) {
        setEditMeal(prev => ({
          ...prev,
          img: data.secure_url
        }));
        setEditFileName(file.name);
      } else {
        console.error('Failed to upload image:', data);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEditSave = () => {
    handleEdit(editMeal);
  };

  const handleEdit = async (meal) => {
    try {
      console.log(meal)
      const id = meal.meal_id;
      const { mealData } = meal;

      const response = await fetch(`http://localhost:3000/api/meal/upd_meal/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        // ensure numeric price is sent as number
        body: JSON.stringify({ ...mealData, price: mealData.price === '' ? null : Number(mealData.price) })
      });

      if (response.ok) {
        setMeals(prev =>
          prev.map(m =>
            m.meal_id === id
              ? { ...m, ...mealData } // 🔥 merge giữ data cũ
              : m
          )
        );

        setShowEditModal(false);
        setEditMeal(null);
      } else {
        const errorData = await response.json();
        console.error(`Failed to update meal: ${errorData.message || 'Unknown error'}`);
        alert(`Failed to update meal: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating meal:", error);
      alert(`Error updating meal: ${error.message || error}`);
    }
  };

  const handleEditClick = (meal) => {
    // normalize before editing
    const normalized = { ...meal, meal_id: meal.meal_id ?? meal.id ?? meal._id };
    setEditMeal(normalized);
    setEditFileName('');
    setShowEditModal(true);
  };

  const getHighlightedCountInCategory = (category) => {
    return meals.filter(meal => meal.category === category && meal.highlight).length;
  };

  const toggleHighlight = async (mealId, currentHighlight, category) => {
    if (!currentHighlight) {
        const highlightedCount = getHighlightedCountInCategory(category);
        if (highlightedCount >= 4) {
            setNotification({
                show: true,
                message: `Không thể nêu bật hơn 4 món ${getCategoryLabel(category)}`
            });
            
            setTimeout(() => {
                setNotification({ show: false, message: '' });
            }, 3000);
            
            return;
        }
    }

    try {
        const response = await fetch(`http://localhost:3000/api/meal/${mealId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ highlight: !currentHighlight })
        });

        if (response.ok) {
        setMeals(prev => prev.map(meal => {
          const mId = meal.meal_id;
          return mId === mealId ? { ...meal, highlight: !meal.highlight } : meal;
        }));
        }
    } catch (error) {
        console.error('Error updating highlight status:', error);
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
        case 'appetizers': return 'Khai vị';
        case 'maki': return 'Maki';
        case 'sushi': return 'Sushi';
        case 'sashimi': return 'Sashimi';
        case 'ramen': return 'Ramen';
        case 'dessert': return 'Tráng miệng';
        case 'softdrinks': return 'Nước giải khát';
        case 'alcohol': return 'Đồ uống có cồn';
        case 'salads': return 'Salads';
        default: return category;
    }
};

  return (
    <div className="flex flex-col items-center w-full min-h-full">
      {notification.show && (
        <div className="fixed top-5 right-5 p-4 rounded bg-white shadow z-50 border-l-4 border-red-500 text-red-500">
          {notification.message}
        </div>
      )}
      <div className="flex items-center w-full ml-5 flex-wrap gap-4">
        <button onClick={() => setShowAddModal(true)} className="px-3 py-2 bg-green-600 text-white rounded-md font-medium">Thêm</button>
        <div className="flex gap-4 ml-4 items-center">
          <select 
            className="px-3 py-2 border border-gray-300 rounded-md w-48"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="appetizers">Khai vị</option>
            <option value="maki">Maki</option>
            <option value="sushi">Sushi</option>
            <option value="sashimi">Sashimi</option>
            <option value="ramen">Ramen</option>
            <option value="dessert">Tráng miệng</option>
            <option value="softdrinks">Nước giải khát</option>
            <option value="alcohol">Đồ uống có cồn</option>
            <option value="salads">Salads</option>
          </select>
      </div>
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Thêm món ăn</h2>
            <div className="mb-4">
              <label className="block mb-1">Tên:</label>
              <input
                type="text"
                name="name"
                value={newMeal.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${validationErrors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors.name && <span className="text-red-500 text-sm">{validationErrors.name}</span>}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Mô tả:</label>
              <textarea
                name="description"
                value={newMeal.description}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${validationErrors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors.description && <span className="text-red-500 text-sm">{validationErrors.description}</span>}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Hình ảnh:</label>
              <div className="flex flex-col gap-2">
                <label className="inline-block px-3 py-2 bg-gray-100 border rounded cursor-pointer">
                  {newMeal.fileName || 'Chọn hình ảnh'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileReceive}
                    style={{ display: 'none' }}
                  />
                </label>
                {validationErrors.img && <span className="text-red-500 text-sm">{validationErrors.img}</span>}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Loại:</label>
              <select
                name="category"
                value={newMeal.category}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${validationErrors.category ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Chọn loại món ăn</option>
                <option value="appetizers">Khai vị</option>
                <option value="maki">Maki</option>
                <option value="sushi">Sushi</option>
                <option value="sashimi">Sashimi</option>
                <option value="ramen">Ramen</option>
                <option value="dessert">Tráng miệng</option>
                <option value="softdrinks">Nước giải khát</option>
                <option value="alcohol">Đồ uống có cồn</option>
                <option value="salads">Salads</option>
              </select>
              {validationErrors.category && <span className="text-red-500 text-sm">{validationErrors.category}</span>}
            </div>
            <div className="mb-4">
              <label className="block mb-1">Giá:</label>
              <input
                type="number"
                name="price"
                value={newMeal.price}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${validationErrors.price ? 'border-red-500' : 'border-gray-300'}`}
              />
              {validationErrors.price && <span className="text-red-500 text-sm">{validationErrors.price}</span>}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleAdd} className="px-3 py-2 bg-green-600 text-white rounded">Lưu</button>
              <button onClick={() => {
                setShowAddModal(false);
                setNewMeal({ name: '', description: '', img: '', category: '', fileName: '', price: '' });
                setValidationErrors({});
              }} className="px-3 py-2 bg-red-500 text-white rounded">Huỷ</button>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-4">Sửa món ăn</h2>
            <div className="mb-4">
              <label className="block mb-1">Tên:</label>
              <input type="text" name="name" value={editMeal?.name || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Mô tả:</label>
              <textarea name="description" value={editMeal?.description || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Hình ảnh:</label>
              <div className="flex flex-col gap-2">
                <label className="inline-block px-3 py-2 bg-gray-100 border rounded cursor-pointer">{editFileName || 'Chọn hình ảnh'}
                  <input type="file" accept="image/*" onChange={handleEditFileReceive} style={{ display: 'none' }} />
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Loại:</label>
              <select name="category" value={editMeal?.category || ''} onChange={handleEditChange} className="w-full p-2 border rounded">
                <option value="">Chọn loại món ăn</option>
                <option value="appetizers">Khai vị</option>
                <option value="maki">Maki</option>
                <option value="sushi">Sushi</option>
                <option value="sashimi">Sashimi</option>
                <option value="ramen">Ramen</option>
                <option value="dessert">Tráng miệng</option>
                <option value="softdrinks">Nước giải khát</option>
                <option value="alcohol">Đồ uống có cồn</option>
                <option value="salads">Salads</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Price:</label>
              <input type="number" name="price" value={editMeal?.price || ''} onChange={handleEditChange} className="w-full p-2 border rounded" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={handleEditSave} className="px-3 py-2 bg-green-600 text-white rounded">Lưu</button>
              <button onClick={() => setShowEditModal(false)} className="px-3 py-2 bg-red-500 text-white rounded">Huỷ</button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-semibold mb-2">Xác nhận xoá</h2>
            <p className="mb-4">Bạn có chắc chắn muốn xoá "{mealToDelete?.name}"?</p>
            <div className="flex justify-end gap-3">
              <button onClick={confirmDelete} className="px-3 py-2 bg-red-600 text-white rounded">Có</button>
              <button onClick={() => { setShowDeleteModal(false); setMealToDelete(null); }} className="px-3 py-2 bg-gray-300 rounded">Huỷ</button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4 mt-6">
        {meals
          .filter(meal => !selectedCategory || meal.category === selectedCategory)
          .map((meal) => {
            const id = meal.meal_id;
            return (
            <div key={id} className="w-full h-96 rounded-2xl relative overflow-hidden flex flex-col bg-white">
                <div className="absolute top-2 right-2 z-10 cursor-pointer bg-white rounded-full w-9 h-9 flex items-center justify-center shadow" onClick={(e) => { e.stopPropagation(); toggleHighlight(id, meal.highlight, meal.category); }}>
                    <FontAwesomeIcon icon={meal.highlight ? fasStar : farStar} className="text-xl" />
                </div>
                <p className="absolute top-2 left-2 bg-[var(--Aka)] text-[var(--Shiro)] rounded-full px-3 py-1 text-sm font-bold">{Number(meal.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                <img src={meal.img} alt={meal.name} className="w-full h-1/2 object-cover" />
                <div className="w-full h-1/2 p-4 bg-[var(--Kuro)] text-[var(--Shiro)] flex flex-col items-center">
                    <p className="font-[var(--font-display)] font-bold text-base">{meal.name}</p>
                    <p className="text-sm text-center py-2">{meal.description}</p>
                    <div className="mt-auto flex gap-2">
                      <button onClick={() => handleEditClick(meal)} className="px-3 py-1 rounded bg-blue-500 text-white">Sửa</button>
                      <button onClick={() => handleDelete(id)} className="px-3 py-1 rounded bg-red-500 text-white">Xoá</button>
                    </div>
                </div>
            </div>
            );
          })}
      </div>
    </div>
  );
}

export default Menu;
