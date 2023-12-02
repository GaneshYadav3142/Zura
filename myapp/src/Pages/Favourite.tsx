import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

interface FavoriteItem {
  itemName: string;
  description: string;
}

export const Favourite: React.FC = () => {
  const navigate = useNavigate();
  const favorites: FavoriteItem[] = JSON.parse(localStorage.getItem('favorites') || '[]');
  const [selectedItem, setSelectedItem] = useState<FavoriteItem | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [isViewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [editedItem, setEditedItem] = useState<FavoriteItem | null>(null);
  const [editedItemName, setEditedItemName] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');
  const [viewedItem, setViewedItem] = useState<FavoriteItem | null>(null);
 

  const handleFav = () => {
    navigate('/');
  };

  const handleDelete = (item:FavoriteItem) => {
      setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleEdit = (item: FavoriteItem) => {
    setEditedItem(item);
    setEditedItemName(item.itemName);
    setEditedDescription(item.description);
    setEditModalOpen(true);
  };

  const handleView = (item:FavoriteItem) => {
    setViewedItem(item);
    setViewModalOpen(true);
  };

  const handleDeleteConfirmation = () => {
    // Add your delete logic here
    if (selectedItem) {
      const newData = favorites.filter((el) => el.itemName !== selectedItem.itemName);
      console.log(newData);
         // Update localStorage with the new data
      localStorage.setItem('favorites', JSON.stringify(newData));
  
      setSelectedItem(null);
      setDeleteModalOpen(false);
    }
  };

 const handleEditConfirmation = () => {
    if (editedItem) {
      // Create a new array with the edited item
      const newData = favorites.map((item) =>
        item.itemName === editedItem.itemName
          ? { ...item, itemName: editedItemName, description: editedDescription }
          : item
      );

      // Update localStorage with the new data
      localStorage.setItem('favorites', JSON.stringify(newData));

      // Reset state
      setEditedItem(null);
      setEditedItemName('');
      setEditedDescription('');
      setEditModalOpen(false);
    }
  };

  const handleCloseModals = () => {
    setDeleteModalOpen(false);
    setEditModalOpen(false);
    setViewModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
    <h2 className="text-3xl font-bold mb-4">Welcome to your Favourite NPM Package</h2>
    <div>
      {favorites.length === 0 ? (
        <div className="text-center">
          <h3 className="text-xl mb-4">You don't have any favourites yet. Please Add</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleFav}
          >
            Add Fav
          </button>
        </div>
      ) : (
        <div>
        <div className="flex justify-end py-3">
  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleFav}>
    Add Fav
  </button>
</div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border-b">Package Name</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((el: FavoriteItem, i: number) => (
                <tr key={i} className={(i + 1) % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="py-2 px-4 border-b">{el.itemName}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleView(el)}
                    >
                      <ViewIcon />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700 mr-2"
                      onClick={() => handleEdit(el)}
                    >
                      <EditIcon />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(el)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

            {/* Delete Modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseModals}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Confirmation</ModalHeader>
                <ModalCloseButton />
                <ModalBody>Are you sure you want to delete this item?</ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={handleDeleteConfirmation}>
                    Yes
                  </Button>
                  <Button colorScheme="red"onClick={handleCloseModals}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* Edit Modal */}
           <Modal isOpen={isEditModalOpen} onClose={handleCloseModals}>
           <ModalOverlay />
          <ModalContent>
          <ModalHeader>Edit Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="grid grid-cols-1 gap-4">
          <div>
           <label htmlFor="editItemName" className="block text-sm font-medium text-gray-600">
           Item Name:
           </label>
          <input
          id="editItemName"
          type="text"
          value={editedItemName}
           onChange={(e) => setEditedItemName(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="editDescription" className="block text-sm font-medium text-gray-600">
          Description:
          </label>
          <textarea
          id="editDescription"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          </div>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleEditConfirmation}>
              Save
            </Button>
            <Button  onClick={handleCloseModals}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

            {/* View Modal */}
            <Modal isOpen={isViewModalOpen} onClose={() => setViewModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>View Item</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {viewedItem && (
              <>
                <p>
                  <strong>Item Name:</strong> {viewedItem.itemName}
                </p>
                <p>
                  <strong>Description:</strong> {viewedItem.description}
                </p>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button  onClick={() => setViewModalOpen(false)} colorScheme="blue" >Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          </div>
        )}
      </div>
    </div>
  );
};
