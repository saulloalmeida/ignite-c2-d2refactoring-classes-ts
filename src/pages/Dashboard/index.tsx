import { useCallback, useEffect, useState } from 'react';

import api from '../../services/api';
import { FoodsContainer } from './styles';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { Food } from '../../components/Food';
import { ModalEditFood } from '../../components/ModalEditFood';

interface FoodGetProps {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string
}

export function Dashboard() {
  const [foods, setFoods] = useState<FoodGetProps[]>([])
  const [editingFood, setEditingFood] = useState<FoodGetProps>()
  const [modalOpen, setModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const loadFoods = useCallback(async () => {
    const response = await api.get('/foods');

    setFoods(response.data)
  }, [])

  useEffect(() => {
    loadFoods()
  }, [loadFoods])
  const handleAddFood = useCallback(async food => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods(state => [...state, response.data])
    } catch (err) {
      console.log(err);
    }
  }, [])

  const handleUpdateFood = useCallback(async (editingFood: FoodGetProps) => {
    try {
      const foodUpdated = await api.put<FoodGetProps>(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...editingFood },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated)
    } catch (err) {
      console.log(err);
    }
  }, [editingFood, foods])

  const handleDeleteFood = useCallback(async id => {
    await api.delete(`/foods/${id}`);

    setFoods(state => state.filter(food => food.id !== id))
  }, [])

  const toggleModal = useCallback(() => {
    setModalOpen(state => !state)
  }, [])

  const toggleEditModal = useCallback(() => {
    setEditModalOpen(state => !state)
  }, [])

  const handleEditFood = useCallback(food => {
    setEditModalOpen(true)
    setEditingFood(food)
  }, [])

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
};





