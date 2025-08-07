export default function ReportPage() {
  return (
    <iframe
      src="/api/pdf-proxy"
      width="100%"
      height="800px"
      style={{ border: "none" }}
    />
  );
}
