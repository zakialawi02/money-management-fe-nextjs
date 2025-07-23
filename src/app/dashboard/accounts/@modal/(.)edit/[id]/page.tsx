import ModalForm from "@/components/modal-form";
import EditAccountPage from "../../../edit/[id]/page";

export default async function EditAccountModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <ModalForm>
      <EditAccountPage params={params} />
    </ModalForm>
  );
}
