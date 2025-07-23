import EditAccountPage from "../../../edit/[id]/page";
import Modal from "@/components/modal";

export default async function EditAccountModal({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <EditAccountPage params={params} />
    </Modal>
  );
}
