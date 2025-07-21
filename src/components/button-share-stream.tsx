import { Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { getShareStreamLink } from "@/app/action";

type Props = {
  userId: string;
  accountId: string;
  date: string;
};

export default function ButtonShareStream({ userId, accountId, date }: Props) {
  const handleShare = async () => {
    toast.info("Generating link, please wait...");
    const res = await getShareStreamLink(userId, accountId, date);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    const url = `${window.location.origin}/stream-report/${res.data.encryptedUrl}`;
    navigator.clipboard.writeText(url);
    toast.success("Link generated successfully!");
  };

  return (
    <Button size={"sm"} onClick={handleShare}>
      <Share2 /> Share Stream Report
    </Button>
  );
}
