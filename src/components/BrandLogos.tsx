export function BrandLogos() {
  return (
    <div className="brand-logos">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo-main" src="/logo.png" alt="IEEE Young Professionals" />
      <span className="brand-logos-divider" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand-logo-tunisia" src="/yp-tunisia-logo.png" alt="IEEE Young Professionals Tunisia Section" />
    </div>
  );
}
