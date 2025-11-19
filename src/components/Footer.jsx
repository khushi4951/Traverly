export default function Footer() {
  return (
    <footer className="bg-light border-top mt-5">
      <div className="container py-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-6">
            <strong>Traverly</strong> — Plan smarter trips.
          </div>
          <div className="col-md-6 text-md-end">
            <small>© {new Date().getFullYear()} Traverly. All rights reserved.</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
