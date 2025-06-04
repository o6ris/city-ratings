"use client";

import { ReactElement } from "react";

export default function Modal({
  content,
  triggerBtnText,
  triggerBtnStyle = "btn btn-primary",
  onAction,
  onActionBtnText = "Confirm",
  closeBtnText = "Close",
  modalId,
}: {
  content: ReactElement;
  triggerBtnText: string;
  triggerBtnStyle?: string;
  onAction?: () => void;
  onActionBtnText?: string;
  closeBtnText?: string;
  modalId: string;
}) {
  return (
    <>
      <button
        className={triggerBtnStyle}
        onClick={() => {
          const modal = document.getElementById(
            modalId
          ) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        {triggerBtnText}
      </button>
      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          {content}
          <div className="modal-action">
            <form method="dialog" className="flex gap-2 w-full">
              <button className="btn btn-neutral text-primary flex-1 shadow-sm border border-base-200 rounded-full">
                {closeBtnText}
              </button>
              {onAction && (
                <button
                  className="btn btn-primary flex-1 rounded-full"
                  onClick={() => {
                    onAction();
                    const modal = document.getElementById(
                      "my_modal"
                    ) as HTMLDialogElement | null;
                    if (modal) {
                      modal.close();
                    }
                  }}
                >
                  {onActionBtnText}
                </button>
              )}
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
