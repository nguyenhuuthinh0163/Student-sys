interface errorTextProps {
  textContent: string | undefined;
}
export default function ErrorText({ textContent }: errorTextProps) {
  return <>{textContent === undefined ? '' : textContent}</>;
}
