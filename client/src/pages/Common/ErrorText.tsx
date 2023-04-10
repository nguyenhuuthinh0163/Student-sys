interface errorTextProps {
  textContent: string | undefined;
}
export default function ErrorText({ textContent }: errorTextProps) {
  const parsedError = Array.isArray(textContent) ? textContent[0] : textContent;
  return <>{parsedError === undefined ? '' : textContent}</>;
}
