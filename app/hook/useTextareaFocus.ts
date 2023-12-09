import { useEffect, useRef, useState } from "react";

interface useTextareaFocusProps {
  initialContent: string;
}

export const useTextareaFocus = ({ initialContent }: useTextareaFocusProps) => {
  const [textValue, setTextValue] = useState<string>(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(initialContent.length, initialContent.length)
    }
  }, [initialContent])

  return { textValue, setTextValue, textareaRef}
}