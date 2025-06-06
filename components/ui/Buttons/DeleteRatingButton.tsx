"use client";

import Modal from "@/components/core/modal/Modal";
import Icon from "@/components/core/Icons/Icon";
import useRating from "@/modules/hooks/ratings/useRating";
import { useRouter } from "next/navigation";

export default function DeleteRatingbutton({
  reviewId,
  districtId,
}: {
  reviewId: string;
  districtId: string;
}) {
  const { deleteRating } = useRating();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await deleteRating(reviewId);
      if (response.success) {
        router.push(`/district/${districtId}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <Modal
      modalId={`modal-delete-review-${reviewId}`}
      onActionBtnText="Delete"
      onAction={handleDelete}
      triggerBtnContent={
        <Icon name="Trash" color="#FC3E3E" size={16} strokeWidth={2} />
      }
      triggerBtnStyle="bg-transparent border border-1 border-error rounded-xl p-2"
      content={
        <div>
          <h4 className="!text-primary">
            Are you sure you want to delete your review ?
          </h4>
        </div>
      }
    />
  );
}
