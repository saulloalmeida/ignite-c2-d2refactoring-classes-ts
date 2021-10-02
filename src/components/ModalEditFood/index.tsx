import { Component, createRef, useCallback, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { Input } from '../Input';
import { Modal } from '../Modal';
import { Form } from './styles';

import { FoodAtributes } from '../Food';
import { FormHandles } from '@unform/core';

interface ModalEditFoodProps {
  isOpen: boolean
  setIsOpen: () => void
  handleUpdateFood: (data: FoodAtributes) => void;
  editingFood: any
}

export function ModalEditFood({
  isOpen,
  setIsOpen,
  handleUpdateFood,
  editingFood
}: ModalEditFoodProps) {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async (data: FoodAtributes) => {
    handleUpdateFood(data);
    setIsOpen();
  }, [handleUpdateFood, setIsOpen])
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}