"use client";
import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import ConfirmationDialog from "../ConfirmationDialog";
import { toast } from "react-toastify";
import api from "@/app/helpers/api";
import { ApiEvents } from "@/app/Props/CommonProps";
import { useRouter } from "next/navigation";

const DeleteRealEstate = ({ id }: { id: string }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const route = useRouter();
  function handleDelete(id: string): void {
    setPopupOpen(true);
  }
  const handleCloseConfirmation = () => {
    setPopupOpen(false);
  };
  function deleteRealEstate(id: string, { onSuccess, onFailure }: ApiEvents) {
    api
      .delete(`/realEstates/${id}`)
      .then((respose) => {
        if (onSuccess) onSuccess(respose);
      })
      .catch((error) => {
        if (onFailure) onFailure(error);
      });
  }
  const handleConfirm = () => {
    // Handle confirmation logic here
    // For example, delete an item
    setLoading(true);
    deleteRealEstate(id, {
      onSuccess: (respose) => {
        if (respose.status === 200) {
          //setImages((prev) => prev.filter((i) => i.url !== url));
          handleCloseConfirmation();
          route.back();
          //redirect
        } else {
          toast.error(respose.status + " " + respose.data);
        }
        setLoading(false);
      },
      onFailure: (error) => {
        toast.error(error);
        setLoading(false);
      },
    });
  };
  return (
    <>
      <ConfirmationDialog
        isOpen={isPopupOpen}
        isLoading={isLoading}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        message="Are you sure you want to delete this Item?"
      />
      <button onClick={() => handleDelete(id)}>
        <AiTwotoneDelete size={30} />
      </button>
    </>
  );
};

export default DeleteRealEstate;
