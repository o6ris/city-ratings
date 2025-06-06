import { ReactNode } from "react";
import Modal from "@/components/core/modal/Modal";
import criteriasDict from "@/modules/utils/criteriasDict";
import iconDict from "@/modules/utils/iconDict";
import Icon from "@/components/core/Icons/Icon";

export default function CriteriaInfos({
  triggerBtnContent,
  triggerBtnStyle,
  criteriaName,
}: {
  triggerBtnContent: ReactNode;
  triggerBtnStyle: string;
  criteriaName: string;
}) {
  return (
    <Modal
      modalId={`modal-criteria-info-${criteriaName}`}
      triggerBtnContent={triggerBtnContent}
      triggerBtnStyle={triggerBtnStyle}
      content={
        <div className="text-primary flex flex-col gap-4">
          <div className="mx-auto">
            <Icon name={iconDict[criteriaName]} size={40} />
          </div>
          <div>
            <h3>{criteriasDict[criteriaName].title}</h3>
            <h4 className="text-secondary">{criteriasDict[criteriaName].subTitle}</h4>
          </div>
          <div>
            <p>
              <strong>{criteriasDict[criteriaName].intro}</strong>
            </p>
            <p>{criteriasDict[criteriaName].explanation}</p>
          </div>
        </div>
      }
    />
  );
}
