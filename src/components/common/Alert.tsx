import Icon from "@mdi/react";
import {
  mdiAlertOutline,
  mdiCheckCircleOutline,
  mdiInformationOutline,
  mdiAlertCircleOutline,
} from "@mdi/js";

enum AlertSeverity {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}

function AlertComponent({
  icon,
  severity,
  message,
}: {
  icon?: boolean;
  severity: AlertSeverity;
  message: string;
}) {
  return (
    <div
      className={`${
        severity == AlertSeverity.SUCCESS
          ? "bg-[#E8F9F1] text-[#00C705] border-[#00C705]"
          : severity == AlertSeverity.ERROR
          ? "bg-[#FFDEE5] text-[#EE5B84] border-[#EE5B84]"
          : severity == AlertSeverity.WARNING
          ? "bg-[#FFF9E3] text-[#FFBB10] border-[#FFBB10]"
          : "bg-[#EBF3FE] text-[#0667F7] border-[#0667F7]"
      } p-4 rounded-md fixed top-5 z-10 bg-opacity-10 border font-bold flex items-center gap-2`}
      style={{ boxShadow: "0px 0px 10px rgba(0,0,0,0.05)" }}
    >
      {icon == true && (
        <Icon
          path={
            severity == AlertSeverity.SUCCESS
              ? mdiCheckCircleOutline
              : severity == AlertSeverity.ERROR
              ? mdiAlertCircleOutline
              : severity == AlertSeverity.WARNING
              ? mdiAlertOutline
              : mdiInformationOutline
          }
          size={0.8}
        />
      )}
      {message}
    </div>
  );
}

export default AlertComponent;
