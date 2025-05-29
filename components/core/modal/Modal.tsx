"use client";

export default function Modal({
  triggerBtnText,
  triggerBtnStyle = "btn btn-primary",
  onAction,
  onActionBtnText = "Confirm",
  closeBtnText = "Close",
}: {
  triggerBtnText: string;
  triggerBtnStyle?: string;
  onAction?: () => void;
  onActionBtnText?: string;
  closeBtnText?: string;
}) {
  return (
    <>
      <button
        className={triggerBtnStyle}
        onClick={() => {
          const modal = document.getElementById(
            "my_modal"
          ) as HTMLDialogElement | null;
          if (modal) {
            modal.showModal();
          }
        }}
      >
        {triggerBtnText}
      </button>
      <dialog id="my_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog" className="flex gap-2 w-full">
              <button className="btn btn-neutral text-primary flex-1 shadow-sm border border-base-200 rounded-full">{closeBtnText}</button>
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
