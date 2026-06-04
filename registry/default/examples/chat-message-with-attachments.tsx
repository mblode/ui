import { ChatMessage } from "@/registry/default/ui/chat-message";

export default function ChatMessageWithAttachments() {
  const files = [
    new File(["%PDF-1.4"], "design-brief.pdf", { type: "application/pdf" }),
    new File(["notes"], "research-notes.txt", { type: "text/plain" }),
  ];

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ChatMessage files={files} from="user">
        Here are the files for review.
      </ChatMessage>
      <ChatMessage from="assistant">
        Got them — I&apos;ll go through the brief and pull out the open questions.
      </ChatMessage>
    </div>
  );
}
