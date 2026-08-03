import { Link } from "react-router-dom";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" to="/" aria-label="AXION home">
      <img src="/logo-mark.svg" alt="" />
      {!compact && <span>AXION</span>}
    </Link>
  );
}
