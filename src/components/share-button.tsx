import { Share } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type Props = {
  userId: string;
  accountId: string;
  date: string;
};

const ShareButton = ({ userId, accountId, date }: Props) => {
  const handleShare = async () => {
    toast.info("Generating link, please wait...");
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/v1/get-streams-url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({
            user_id: userId,
            account_id: accountId,
            date: date,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to get streams URL");
      }
      const url = `${window.location.origin}/stream-report/${result.data.encryptedUrl}`;
      navigator.clipboard.writeText(url);
      toast.success("Link generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed get link. Please try again later.");
    }
  };

  return (
    <>
      <Button onClick={handleShare}>
        <Share /> Share Stream Report
      </Button>
    </>
  );
};

export default ShareButton;
